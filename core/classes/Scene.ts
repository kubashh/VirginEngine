import { createRootNode, type Node } from "../components/Node";
import { events, eventsHover, nodes, scenes } from "../values/consts";
import { clearObject, deepCopy, onresize } from "../util/basicFunctions";
import { VirginEngine } from "./VirginEngine";

export class Scene {
  root: Node;

  camera = { position: { x: 0, y: 0 } }; // on change update root pos = update all pos + shaking + resize

  constructor(name: string) {
    onresize();
    VirginEngine.timeScale = 0;

    const props: SceneProps = scenes[name];
    if (!props) throw new Error(`No such scene "${name}"!`);
    this.root = createRootNode(Object.assign(deepCopy(props), { parent: {} as Node }) as any, name);
    VirginEngine.timeScale = 1;

    for (const node of nodes) node.scriptChild?.start?.();
  }

  close() {
    this.root.destroy();

    nodes.length = 0;

    clearObject(events);
    clearObject(eventsHover);

    clearObject(this); // clear scene
  }
}

type SceneProps = { name: string; [key: string]: any };
