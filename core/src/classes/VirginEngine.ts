import { Timer } from "./Timer";
import { ctx, events, nodes, Log, files, performanceInfo } from "../values/consts";
import { clearObject, drawText, wait } from "../util/basicFunctions";
import { Scene } from "./Scene";

// @ts-ignore
const renderTimer: Timer = performanceInfo && new Timer(`Sprite`, `Text`, `Nodes`);
// @ts-ignore
const updateTimer: Timer = performanceInfo && new Timer(`Physics`, `Nodes`);

export class VirginEngine {
  private static running = false;
  private static renderFrameId = 0;

  static scene: TScene;

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
      delta += (now - Time.lastTime) * Time.msdiv; // minimal performance boost
      Time.lastTime = now;
      if (delta > 60) delta = 60;

      while (delta >= 1) {
        VirginEngine.update();
        performanceInfo && Log.updatesTemp++;
        delta--;
      }

      // log staff
      if (performanceInfo && now - Log.timer > 1000) {
        Log.timer += 1000;
        if (performanceInfo) {
          Log.updates = Log.updatesTemp;
          Log.frames = Log.framesTemp;
          Log.updatesTemp = 0;
          Log.framesTemp = 0;
          Timer.reset();
        }
      }

      await wait();
    }
  }

  private static async loadAssets() {
    await Promise.allSettled(VirginEngine.assetsToLoad(files));
  }

  private static assetsToLoad(obj: TObj<any>) {
    const toLoad: Promise<void>[] = [];

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === `object`) toLoad.push(...VirginEngine.assetsToLoad(value));
      else if (typeof value === `string`) {
        if (value.startsWith(`data:image/`)) {
          toLoad.push(
            new Promise((resolve) => {
              const img = new Image();
              img.src = value;
              img.onload = () => {
                img.onload = null;
                obj[key] = img;
                resolve();
              };
            }),
          );
        } else if (value.startsWith(`data:audio/`)) {
          obj[key] = new Audio(value);
          obj[key].onload = null;
        }
      }
    }

    return toLoad;
  }

  private static update() {
    if (performanceInfo) {
      updateTimer.measure({ Physics: VirginEngine.updatePhysics, Nodes: VirginEngine.updateNodes });
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
      renderTimer.measure({
        Sprite: VirginEngine.renderSprite,
        Text: VirginEngine.renderText,
        Nodes: VirginEngine.renderNodes,
      });
      VirginEngine.renderPerformanceInfo();
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

  private static renderPerformanceInfo() {
    const props = {
      x: 6,
      y: 6,
      h: 18,
      rect: { x: -1, y: -1 },
      color: `white`,
      textAlign: `left`,
      textBaseline: `top`,
    };

    drawText({
      ...props,
      text: `${nodes.length}obj, ${Log.updates}ups, ${Log.frames}fps`,
      x: -6,
      rect: { x: 1, y: -1 },
      textAlign: `right`,
    });

    for (const text of renderTimer.allFormatted) {
      drawText({ text, ...props });
      props.y += 18;
    }

    props.x = 160;
    props.y = 6;

    for (const text of updateTimer.allFormatted) {
      drawText({ text, ...props });
      props.y += 18;
    }
  }

  static quit() {
    VirginEngine.running = false;
    cancelAnimationFrame(VirginEngine.renderFrameId);
    VirginEngine.scene.close();
  }

  // time
  static get timeScale() {
    return Time.timeScale;
  }

  static set timeScale(scale: number) {
    Time.timeScale = scale;
  }

  // load scene
  static async loadScene(name: string) {
    VirginEngine.scene?.close();
    VirginEngine.scene = new Scene(name);
  }
}

class Time {
  private static vtimeScale = 1;
  static msdiv = 1;
  static lastTime = 0;

  static get timeScale() {
    return Time.vtimeScale;
  }

  static set timeScale(timeScale: number) {
    this.vtimeScale = timeScale;
    const ms = 1000 / (60 * this.vtimeScale);
    this.msdiv = 1 / ms;
    Time.lastTime = performance.now();
  }
}
