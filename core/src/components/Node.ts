import { Sprite } from "./Sprite";
import { Text } from "./Text";
import { Collider } from "./Collider";
import { Physics } from "./Physics";
import { Animation } from "./Animation";
import { AudioElement } from "./AudioElement";
import { nodes } from "../values/consts";
import { deepCopy, isChildKey } from "../util/basicFunctions";

const keywords = [`parent`, `position`, `rotation`, `scale`, `scriptChild`];

let nodeCounter = 0;

export function createNode(props: NodeProps, name: string) {
  const node = new Node(name);
  node.parent = props.parent;
  if (props.parent) node.parent[node.name] = node;
  nodes.push(node);

  node.transform.p = new GSXY(props.transform?.position);
  if (props.transform?.rotation) node.rotation = props.transform.rotation;
  node.transform.s = new GSXY(props.transform?.scale || { x: 1, y: 1 });

  if (props.rect) node.rect = props.rect;
  if (props.text) node.text = new Text(props.text, node);
  if (props.sprite) node.sprite = new Sprite(props.sprite, node);
  if (props.physics) node.physics = new Physics(props.physics, node);

  if (props.collider) node.collider = new Collider(props.collider, node);
  if (props.animation) node.animation = new Animation(props.animation, node);
  if (props.audio) node.audio = new AudioElement(props.audio);

  if (props.script) {
    node.script = props.script;
    node.scriptChild = new props.script();
    node.scriptChild!.node = node;
  }

  if (props.childern)
    for (const key in props.childern) {
      createNode({ ...props.childern[key], parent: node }, key);
    }
  for (const key in props) {
    if (isChildKey(key)) createNode({ ...props[key], parent: node }, key);
  }

  node.id = nodeCounter++;

  return node;
}

export class Node implements TNode {
  name: string;
  id!: number;
  parent!: TNode;

  transform = {
    p: {} as XY,
    rz: 0,
    s: {} as XY,
  };

  rect?: XY;

  text?: Text;
  sprite?: Sprite;
  physics?: Physics;

  collider?: Collider;
  animation?: Animation;
  audio?: AudioElement;

  script?: any;
  scriptChild?: {
    node: TNode;
    start?: () => {};
    update?: () => {};
    render?: () => {};
  }; // temp solution

  constructor(name: string) {
    this.name = name;
  }

  get childs(): Node[] {
    return Object.keys(this).reduce(
      (prev, key) => (isChildKey(key) ? [...prev, (this as TNode)[key]] : prev),
      [] as Node[],
    );
  }

  get position(): XY {
    return this.transform.p;
  }
  set position({ x, y }) {
    for (const child of this.childs) {
      child.position.x += -this.position.x + x;
      child.position.y += -this.position.y + y;
    }

    this.transform.p.x = x;
    this.transform.p.y = y;
  }

  get rotation() {
    return this.transform.rz;
  }
  set rotation(z: number) {
    z %= 360;
    if (z < 0) z += 360;

    for (const child of this.childs) {
      child.rotation = child.rotation - this.rotation + z;
    }

    this.transform.rz = z;
  }

  get scale(): XY {
    return this.transform.s;
  }
  set scale({ x, y }) {
    for (const child of this.childs) {
      child.scale.x = (child.scale.x / this.scale.x) * x;
      child.scale.y = (child.scale.y / this.scale.y) * y;
    }

    this.transform.s.x = x;
    this.transform.s.y = y;

    this.sprite?.reload();
  }

  clone(parent = this.parent): TNode {
    const newObj: TObj<any> = {
      transform: {
        position: {
          x: this.position.x,
          y: this.position.y,
        },
        rotation: this.rotation,
        scale: {
          x: this.scale.x,
          y: this.scale.y,
        },
      },
      rect: this.rect,
      sprite: this.sprite?.props,
      text: this.text?.props,
    };

    for (const key in this) {
      if (!(key in newObj) && !keywords.includes(key)) newObj[key] = this[key];
    }

    const props = deepCopy(newObj) as NodeProps;

    const newNode = createNode(Object.assign(props, { parent, script: this.script }), this.name);
    newNode.scriptChild?.start?.();

    return newNode;
  }

  destroy() {
    for (const child of this.childs) child.destroy();

    const { parent, name } = this;

    for (const key in this) delete this[key];
    nodes.splice(nodes.indexOf(this), 1);
    delete parent[name];
  }
}

class GSXY implements XY {
  private vx;
  private vy;

  constructor(props?: XY) {
    this.vx = props?.x || 0;
    this.vy = props?.y || 0;
  }

  get x() {
    return this.vx;
  }
  set x(v: number) {
    this.vx = v;
  }

  get y() {
    return this.vy;
  }
  set y(v: number) {
    this.vy = v;
  }
}

type TNode = {
  name: string;
  id: number;
  parent: TNode;

  position: XY;
  rotation: number;
  scale: XY;
  rect?: XY;

  text?: Text;
  sprite?: Sprite;
  physics?: Physics;
  animation?: Animation;
  audio?: AudioElement;

  script?: {
    node: TNode;
    start?: () => {};
    update?: () => {};
    render?: () => {};
  };
  scriptChild?: any; // temp object

  childs: TNode[];
  clone: () => void;
  destroy: () => void;

  [key: string]: any; // TNode
};
