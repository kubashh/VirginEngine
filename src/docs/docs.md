# VirginEngine Docs

## General rules

- `Scenes` can be saved only in Scenes folder. Scenes folder containts only scenes (also no folders)

## Engine Api

```ts
type VirginEngine = {
  timeScale: number; // get/set change game time
  loadScene: (name: string) => void; // load scene by name
  quit: () => never; // quit game
};
```

## Components

```ts
// any Script
type Script = {
  node: Node; // automatically assigned
};

type Node = {
  parent: Node;
  id: number;
  name: string;

  position: XY;
  rotation: number;
  scale: XY;
  rect?: XY;

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
  velocity: XY;
  gravity: boolean;

  update: () => void;
  addForce: (force: XY) => void;
};

type Collider = {};

type Animation = {
  start: () => void;
  stop: () => void;
};

type AudioVE = {
  play: () => void;
  pause: () => void;
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
  performanceInfo: TEnum<`yes` | `dev` | `no`>; // see performance info. yes - game and dev, dev - dev only, no - nowhere
};
```
