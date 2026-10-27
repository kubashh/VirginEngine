// types

type TObj<T> = Record<string, T>;

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
