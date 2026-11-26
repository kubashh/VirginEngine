import { Timer } from "./Timer";
import { ctx, events, nodes, Log, performanceInfo, images } from "../values/consts";
import { clearObject, wait } from "../util/basicFunctions";
import { Scene } from "./Scene";

export class VirginEngine {
  private static running: boolean = false;
  private static renderFrameId: number = 0;

  static scene: Scene;

  private static vtimeScale: number = 1;
  private static msdiv: number = 1;
  private static lastTime: number = 0;

  static async run() {
    VirginEngine.running = true;
    await VirginEngine.loadAssets(); // need load assets before scene
    await VirginEngine.loadScene(`REPLACE_STARTING_SCENE_NAME`);

    requestAnimationFrame(VirginEngine.render);

    performanceInfo && (Log.timer = performance.now());
    performanceInfo && (Log.updatesTemp = 0);
    let delta = 0;
    while (VirginEngine.running) {
      const now = performance.now();
      delta += (now - VirginEngine.lastTime) * VirginEngine.msdiv; // minimal performance boost
      VirginEngine.lastTime = now;
      if (delta > 60) delta = 60;

      while (delta >= 1) {
        VirginEngine.update();
        performanceInfo && Log.updatesTemp++;
        delta--;
      }

      // log performance info
      if (performanceInfo && now - Log.timer > 2000) {
        Log.timer += 2000;
        if (performanceInfo) {
          Log.updates = Log.updatesTemp >> 1;
          Log.frames = Log.framesTemp >> 1;
          Log.updatesTemp = 0;
          Log.framesTemp = 0;
          Timer.reset();
        }
      }

      await wait(0);
    }
  }

  private static async loadAssets() {
    const toLoad: Promise<void>[] = [];

    // images
    for (const key in images) {
      toLoad.push(
        new Promise((resolve) => {
          const img = new Image();
          img.src = images[key];
          img.onload = () => {
            img.onload = null;
            images[key] = img;
            resolve();
          };
        }),
      );
    }

    // audio
    // for (const key in audio) {
    //   const value = audio[key];
    //   audio[key] = new Audio(value);
    //   audio[key].onload = null;
    // }

    return Promise.allSettled(toLoad);
  }

  private static update() {
    if (performanceInfo) {
      Timer.updateTimer.measure({ Physics: VirginEngine.updatePhysics, Nodes: VirginEngine.updateNodes });
    } else {
      VirginEngine.updatePhysics();
      VirginEngine.updateNodes();
    }

    // clear events, not eventsHover
    clearObject(events);
  }

  private static updatePhysics() {
    for (const node of nodes) node.physics?.update();
  }

  private static updateNodes() {
    for (const node of nodes) node.scriptChild?.update?.();
  }

  private static render() {
    if (!VirginEngine.running) return;

    VirginEngine.clearCtx();

    if (performanceInfo) {
      Timer.renderTimer.measure({
        Sprite: VirginEngine.renderSprite,
        Text: VirginEngine.renderText,
        Nodes: VirginEngine.renderNodes,
      });
      Timer.renderPerformanceInfo();
      Log.framesTemp++;
    } else {
      VirginEngine.renderSprite();
      VirginEngine.renderText();
      VirginEngine.renderNodes();
    }

    // recall render
    VirginEngine.renderFrameId = requestAnimationFrame(VirginEngine.render);
  }

  private static clearCtx() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  private static renderSprite() {
    for (const node of nodes) node.sprite?.render();
  }

  private static renderText() {
    for (const node of nodes) node.text?.render();
  }

  private static renderNodes() {
    for (const node of nodes) node.scriptChild?.render?.();
  }

  static quit() {
    VirginEngine.running = false;
    cancelAnimationFrame(VirginEngine.renderFrameId);
    VirginEngine.scene.close();
  }

  // time
  static get timeScale() {
    return VirginEngine.vtimeScale;
  }

  static set timeScale(scale: number) {
    VirginEngine.vtimeScale = scale;
    const ms = 1000 / (60 * VirginEngine.vtimeScale);
    VirginEngine.msdiv = 1 / ms;
    VirginEngine.lastTime = performance.now();
  }

  // load scene
  static async loadScene(name: string) {
    VirginEngine.scene?.close();
    VirginEngine.scene = new Scene(name);
  }
}
