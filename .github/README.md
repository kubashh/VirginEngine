# VirginEngine

Simple JS game engine for 2D web games

## Engine

### Components

- `Node` (GameObject 90% done)
- `Animation` (1% done)
- `AudioElement` (Audio 80% done)
- `Collider` (1% done)
- `Physics` (20% done)
- `Sprite` (70% done)
- `Text` (50% done)

### Objects

```ts
type scene = {
  camera: XY;

  load(newScene: SceneProps): void;

  [key: string]: any;
};
```

### Util

```ts
function wait(time?: number | undefined): Promise<void>;
function deepCopy<T>(data: T): T;
function file(path: string): any;
function randInt(min: number, max?: number | undefined): number;
function rand(min?: number, max?: number | undefined): number;
function randStr(n?: number): string;
function randColor(): string;
```

## Editor

### Config [Docs](https://github.com/kubashh/VirginEngine/blob/main/src/docs/README.md)

## Project structure

- /core - engine core, contains build function
- /src - editor

## Scripting concepts (0.23.0)

### Before compiling (editor)

```ts
// serialized scene data (user don't see it)
let SceneData = {
  gameObjects: [
    {
      id: 1,
      name: `John`,
      components: [
        {
          type: `MyClass`,
          count: 0,
          displayName: `John`,
          col: { targetObjectId: 1, targetComponentType: `Collider` },
        },
        { type: `Collider` },
      ],
    },
  ],
};

// user script
class MyClass extends Beh {
  public health: number = 100;
  public nick!: string; // attached to `John` in editor
  public col!: Collider; // attached to object collider (reference)

  start() {
    console.log(this.nick, this.health); // John 100
  }
}
```

### After compiling (runtime)

```ts
class Component {
  node!: Node;

  // ...
}

abstract class Script extends Component {
  start?(): void;
  update?(): void;
}

class Node {
  components: Component[] = [];

  addComponent<T extends Component>(component: T): T {
    component.node = this;
    this.components.push(component);
    return component;
  }

  getComponent<T extends Component>(type: new () => T): T | undefined {
    return this.components.find((component) => component instanceof type) as T | undefined;
  }

  // ...
}

class MyClass extends Script {
  public health: number = 100;
  public nick!: string; // attached to `John` in editor
  public col!: Collider; // attached to object collider (reference)

  start() {
    console.log(this.nick, this.health); // John 100
  }
}

let node = new Node();
let collider = new Collider(/* ... */);
node.addComponent(collider);
let script = new MyClass();
node.addComponent(script);
script.nick = `John`; // from editor
script.col = collider; // or node.getComponent(Collider); // from editor
script.start(); // skip if not contains start method
```
