// types

type TObj<T> = Record<string, T>;

type XY = {
  x: number;
  y: number;
};

type WH = {
  w: number;
  h: number;
};

// declarations

declare const REPLACE_FILES: TObj<any>;
declare const REPLACE_HTML_TEMPLATE: string;
declare const REPLACE_CORE: string;
declare const REPLACE_VIRGIN_ENGINE_VERSION: string;
declare const REPLACE_PERFORMANCE_INFO: boolean;

// props

type NodeProps = {
  rect?: XY;
  parent: TNode;
  transform: TransformProps;

  text?: TextProps;
  sprite?: SpriteProps;
  physics?: PhysicsProps;
  audio?: AudioProps;

  collider?: ColliderProps;
  animation?: AnimationProps;

  start?: () => void;
  update?: () => void;
  render?: () => void;

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
  textAlign?: `left` | `center` | `right` | string;
  textBaseline?: `bottom` | `middle` | `top` | string;
};

type drawProps = {
  text?: string;
  color?: string;
  x: number;
  y: number;
  w?: number;
  h: number;
  font?: string;
} & TObj<any>;

type SceneProps = { name: string; [key: string]: any };

// compponents

type TNode = {
  name: string;
  id: number;
  parent: TNode;

  start?: () => void;
  update?: () => void;
  render?: () => void;

  position: XY;
  rotation: number;
  scale: XY;
  rect?: XY;

  text?: TText;
  sprite?: TSprite;
  physics?: TPhysics;
  animation?: TAnimation;
  audio?: TAudio;

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

  [key: string]: any;
};

type TText = {
  value: string;
  color: string;

  textBaseline?: string;
  textAlign?: string;

  render: () => void;

  props: {
    value: string;
  };
};

type TSprite = {
  path: string;
  img: HTMLImageElement;

  reload: () => void;
  resize: () => void;
  render: () => void;
  props: {
    path: string;
  };
};

type TPhysics = {
  velocity: number;
  target: XY;
  gravity: boolean;

  update: () => void;
  addForce: (force: XY) => void;
};

type TCollider = {};

type TAnimation = {};

type TAudio = {
  play: () => void;
  stop: () => void;
};

type TScene = {
  root: TNode;

  camera: XY;

  close(): void;

  [key: string]: any;
};
