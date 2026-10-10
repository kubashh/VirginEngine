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

## [Docs](https://github.com/kubashh/VirginEngine/blob/main/src/docs/docs.md)

## Project structure

- /core - engine core, contains build function
- /src - editor

## Scripting stardants

- no `export default`
- classes | ReactComponents - PascalCase
- variables | functions | objects - camelCase

## Scripting concepts (0.24.0)

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
  public col!: Collider; // attached to object collider (reference)

  start() {
    console.log(this.health); // 100
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
  public col!: Collider; // attached to object collider (reference)

  start() {
    console.log(this.health); // 100
  }
}

let node = new Node();
let collider = new Collider(/* ... */);
node.addComponent(collider);
let script = new MyClass();
node.addComponent(script);
script.col = collider; // or node.getComponent(Collider); // from editor
script.start(); // skip if not contains start method
```
