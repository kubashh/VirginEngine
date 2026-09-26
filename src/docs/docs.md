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
// Any Script
type Script = {
  node: TNode; // automatically assigned
};

type TNode = {
  parent: TNode;
  id: number;
  name: string;

  position: XY;
  rotation: number;
  scale: XY;
  rect?: XY;

  text?: TText;
  sprite?: TSprite;
  physics?: TPhysics;
  animation?: TAnimation;
  audio?: TAudio;

  childs: TNode[];
  clone: () => void;
  destroy: () => void;

  [key: string]: TNode;
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

  reload: () => void;
  resize: () => void;
  render: () => void;
  props: {
    path: string;
  };
};

type TPhysics = {
  velocity: XY;
  gravity: boolean;

  update: () => void;
  addForce: (force: XY) => void;
};

type TCollider = {};

type TAnimation = {};

type TAudio = {
  play: () => void;
  pause: () => void;
};
```

## Util

```ts
function wait(ms?: number | undefined): Promise<void>;
function deepCopy<T>(data: T): T;
function file(path: string): any;
function randInt(min: number, max?: number | undefined): number;
function rand(min?: number, max?: number | undefined): number;
function randStr(n?: number): string;
function randColor(): string;
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
