type XY = {
  x: number;
  y: number;
};

type WH = {
  w: number;
  h: number;
};

type F<T> = () => T;
type Void = F<void>;

type TObj<T> = Record<string, T>;
type Any = TObj<any>;

// Props

type NodeProps = {
  rect?: XY;
  parent?: TNode;
  transform: TransformProps;

  text?: TextProps;
  sprite?: SpriteProps;
  physics?: PhysicsProps;
  audio?: AudioProps;

  collider?: ColliderProps;
  animation?: AnimationProps;

  start?: Void;
  update?: Void;
  render?: Void;

  [key: string]: any;
};

type TransformProps = { position?: XY; rotation?: number; scale?: XY } | undefined;
type TextProps = { value: string; color: string };
type SpriteProps = { path: string };
type PhysicsProps = { gravity: boolean };
type ColliderProps = {};
type AnimationProps = { frames: TSprite[] };
type AudioProps = { path: string };

type drawTextProps = {
  text: string;
  color: string;
  x: number;
  y: number;
  w?: number;
  h: number;
  font?: string;
  rect?: XY;
  align?: XY;
  textAlign?: string;
  textBaseline?: string;
};

type drawProps = {
  text?: string;
  color?: string;
  x: number;
  y: number;
  w?: number;
  h: number;
  font?: string;
} & Any;

type SceneProps = { name: string } & Any;

// Compponents

type TNode = {
  parent: TNode;
  name: string;

  start?: Void;
  update?: Void;
  render?: Void;

  position: XY;
  rotation: number;
  scale: XY;
  rect?: XY;

  text?: TText;
  sprite?: TSprite;
  physics?: TPhysics;
  animation?: TAnimation;
  audio?: TAudio;

  constructor: any;

  childs: TNode[];
  props: NodeProps;
  clone: Void;
  destroy: Void;

  [key: string]: any;
};

type TText = {
  value: string;
  color: string;

  textBaseline?: string;
  textAlign?: string;

  constructor: any;

  render: Void;

  props: {
    value: string;
  };
};

type TSprite = {
  path: string;
  img: HTMLImageElement;

  constructor: any;

  reload: Void;
  resize: Void;
  render: Void;
  props: {
    path: string;
  };
};

type TPhysics = {
  velocity: number;
  target: XY;
  gravity: boolean;

  constructor: any;

  update: Void;
  addForce: (force: XY) => void;
};

type TCollider = {
  constructor: any;
};

type TAnimation = {
  constructor: any;
};

type TAudio = {
  constructor: any;
  play: Void;
  stop: Void;
};

type TScene = {
  camera: XY;
  ms: number;
  lastTime: number;

  constructor: any;

  load(newScene: SceneProps): void;
  time: number;

  [key: string]: any;
};
