import { createNode } from "../components/Node";
import { events, eventsHover, files, nodes } from "../values/consts";
import { clearObject, deepCopy, onresize } from "../util/basicFunctions";
import { VirginEngine } from "./VirginEngine";

export class Scene implements TScene {
  // loaded = new Map<number, boolean>() // TODO key: id; if loaded.size === 0 run scene
  root: TNode;

  camera = { x: 0, y: 0 }; // on change update root pos = update all pos + shaking + resize

  constructor(name: string) {
    onresize();
    VirginEngine.timeScale = 1;
    // @ts-ignore
    const props: SceneProps = Object.values(files.Scenes).find((s) => s.name === name);
    if (!props) throw new Error(`No such scene "${name}"!`);
    this.root = createNode({ ...deepCopy(props), parent: {} as TNode } as any, name);
    VirginEngine.timeScale = 1;

    nodes.shift(); // remove root node from nodes

    for (const node of nodes) node.start?.();
  }

  close() {
    this.root.destroy();

    nodes.length = 0;

    clearObject(events);
    clearObject(eventsHover);

    clearObject(this); // clear scene
  }
}
