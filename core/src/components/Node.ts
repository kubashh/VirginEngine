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

export function createNode(
  {
    parent,
    transform,
    rect,
    text,
    sprite,
    collider,
    physics,
    animation,
    audio,
    start,
    update,
    render,
    script,
    ...rest
  }: NodeProps,
  name: string,
) {
  const node = new Node(name);
  node.parent = parent;
  if (parent) node.parent[node.name] = node;
  nodes.push(node);

  node.transform.p = new GSXY(transform?.position);
  if (transform?.rotation) node.rotation = transform.rotation;
  node.transform.s = new GSXY(transform?.scale || { x: 1, y: 1 });

  if (rect) node.rect = rect;
  if (text) node.text = new Text(text, node);
  if (sprite) node.sprite = new Sprite(sprite, node);
  if (physics) node.physics = new Physics(physics, node);

  if (collider) node.collider = new Collider(collider, node);
  if (animation) node.animation = new Animation(animation, node);
  if (audio) node.audio = new AudioElement(audio);

  if (script) {
    node.script = script;
    node.scriptChild = new script();
    node.scriptChild.node = node;
  }

  for (const key in rest) {
    (node as TNode)[key] = isChildKey(key)
      ? createNode({ ...rest[key], parent: node }, key)
      : typeof rest[key] === `function`
        ? rest[key].bind(node)
        : rest[key];
  }

  if (start) node.start = start;
  if (update) node.update = update;
  if (render) node.render = render;

  node.id = nodeCounter++;

  return node;
}

class Node implements TNode {
  name: string;
  id!: number;
  parent!: TNode;

  transform = {
    p: {} as XY,
    rz: 0,
    s: {} as XY,
  };

  rect?: XY;

  text?: TText;
  sprite?: TSprite;
  physics?: TPhysics;

  collider?: TCollider;
  animation?: TAnimation;
  audio?: TAudio;

  script?: any;
  scriptChild?: any; // temp solution

  start?: () => void;
  update?: () => void;
  render?: () => void;

  constructor(name: string) {
    this.name = name;
  }

  get childs(): TNode[] {
    return Object.keys(this).reduce(
      (prev, key) => (isChildKey(key) ? [...prev, (this as TNode)[key]] : prev),
      [] as TNode[],
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
    const name = `${this.name}-${this.id}`;

    const newObj: TObj<any> = {
      start: this?.start,
      update: this?.update,
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

    const newNode = createNode(Object.assign(props, { parent, script: this.script }), name);
    newNode.start?.bind(newNode)();
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
