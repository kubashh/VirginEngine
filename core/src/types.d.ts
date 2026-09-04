// Types

type TObj<T> = Record<string, T>;

type XY = {
  x: number;
  y: number;
};

type WH = {
  w: number;
  h: number;
};

// Props

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
} & TObj<any>;

type SceneProps = { name: string } & TObj<any>;

// Compponents

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

  constructor: any;

  childs: TNode[];
  props: NodeProps;
  clone: () => void;
  destroy: () => void;

  [key: string]: any;
};

type TText = {
  value: string;
  color: string;

  textBaseline?: string;
  textAlign?: string;

  constructor: any;

  render: () => void;

  props: {
    value: string;
  };
};

type TSprite = {
  path: string;
  img: HTMLImageElement;

  constructor: any;

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

  constructor: any;

  update: () => void;
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
  play: () => void;
  stop: () => void;
};

type TScene = {
  root: TNode;

  camera: XY;

  msdiv: number;
  lastTime: number;

  constructor: any;

  load(newScene: SceneProps): void;
  time: number;

  [key: string]: any;
};

// Global declarations

declare const REPLACE_FILES: TObj<any>;
declare const REPLACE_PATH_TO_MAIN_SCENE: any;
declare const REPLACE_HTML_TEMPLATE: string;
declare const REPLACE_CORE: string;
declare const REPLACE_VIRGINE_ENGINE_VERSION: string;
declare const REPLACE_PERFORMANCE_INFO: boolean;
