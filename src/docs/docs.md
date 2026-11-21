# VirginEngine Docs

## General rules

- `Scenes` can be saved only in Scenes folder. Scenes folder containts only scenes (also no folders)
- `Audio` only `.mp3` is supported

## Engine Api

```ts
type VirginEngine = {
  timeScale: number; // get/set change game time
  loadScene: (name: string) => void; // load scene by name
  quit: () => never; // quit game
};
```

## Components

- `Node` is just object assing to every script
- `Rect` make elemnent relative to camera (good for UI)
- `Text` render text to screen. Transform.scale.y is height of text
- `Sprite` render image
- `Physics` (in development)
- `Collider` (in development)
- `Animation` (in development)
- `Audio` sound api

### Components API

```ts
// any Script
type Script = {
  node: Node; // automatically assigned
};

type Node = {
  parent: Node;
  id: number;
  name: string;

  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
  rect?: { x: number; y: number };

  text?: Text;
  sprite?: Sprite;
  physics?: Physics;
  animation?: Animation;
  audio?: AudioVE;

  childs: Node[];
  clone: () => void;
  destroy: () => void;

  [key: string]: Node;
};

type Rect = {
  x: number;
  y: number;
};

type Text = {
  value: string;
  color: string;

  textBaseline?: string;
  textAlign?: string;

  render: () => void;

  getProps: () => {
    value: string;
  };
};

type Sprite = {
  path: string;
  img: HTMLImageElement;

  reload: () => void;
  resize: () => void;
  render: () => void;
  getProps: () => {
    path: string;
  };
};

type Physics = {
  velocity: { x: number; y: number };
  gravity: boolean;

  update: () => void;
  addForce: (force: { x: number; y: number }) => void;
};

type Collider = {};

type Animation = {
  start: () => void;
  stop: () => void;
};

type AudioVE = {
  play: () => void;
  pause: () => void;
  loop: boolean; // set only
  currentTime: number; // get only
};
```

## Util

```ts
function wait(ms: number): Promise<void>;
function deepCopy<T>(data: T): T;
function file(path: string): any;
function random(min: number, max: number): number;
function randomInt(min: number, max: number): number;
```

## Editor Config

```ts
type config = {
  gameName: string; // name of game
  version: string; // version of game
  author: string; // author/company of project
  description: string; // short game description
  fullScreen: boolean; // start with full screen
  startingSceneName: string; // specify where is main scene
  hydrateCanvasId: string; // specify a canvas ID to export JavaScript only. for an HTML build (default), leave it empty
  performanceInfo: TEnum<`yes` | `dev` | `no`>; // see performance info. yes - game and dev, dev - dev only, no - nowhere
};
```
