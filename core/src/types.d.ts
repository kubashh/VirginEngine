// types

type TObj<T> = Record<string, T>;

// declarations

declare const REPLACE_FILES: TObj<any>;
declare const REPLACE_HTML_TEMPLATE: string;
declare const REPLACE_CORE: string;
declare const REPLACE_VIRGIN_ENGINE_VERSION: string;
declare const REPLACE_PERFORMANCE_INFO: boolean;

// props

type TransformProps = {
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
};
type TextProps = { value: string; color: string };
type SpriteProps = { path: string };
type PhysicsProps = { gravity: boolean };
type ColliderProps = {};
type AnimationProps = { frames: TSprite[] };
type AudioProps = { path: string };
