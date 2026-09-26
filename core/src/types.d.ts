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

  childern?: NodeProps[];

  [key: string]: any; // NodeProps
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
