import { Timer } from "../values/classes";
import { ctx, events, nodes, Log, scene, files, performanceInfo } from "../values/consts";
import { clearObject, drawText, wait } from "../util/basicFunctions";

// @ts-ignore
const renderTimer: Timer = performanceInfo && new Timer(`Sprite`, `Text`);
// @ts-ignore
const updateTimer: Timer = performanceInfo && new Timer(`Physics`, `Nodes`);

export class VirginEngine {
  static running = false;
  static renderFrameId = 0;

  static async run() {
    VirginEngine.running = true;
    await VirginEngine.loadAssets();
    scene.load(REPLACE_PATH_TO_MAIN_SCENE);

    requestAnimationFrame(VirginEngine.render);

    let timer = performance.now();
    let updates = 0;
    let delta = 0;
    while (VirginEngine.running) {
      const now = performance.now();
      delta += (now - scene.lastTime) * scene.msdiv; // Minimal performance boost
      if (delta > 60) delta = 60;

      scene.lastTime = now;
      while (delta >= 1) {
        VirginEngine.update();
        updates++;
        delta--;
      }

      // log staff
      if (now - timer > 1000) {
        timer += 1000;
        if (performanceInfo) {
          Log.updates = updates;
          Log.frames = Log.framesTemp;
          updates = 0;
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
    for (const node of nodes) node.update?.();
  }

  private static render() {
    if (!VirginEngine.running) return;

    VirginEngine.clearCtx();

    if (performanceInfo) {
      renderTimer.measure({ Sprite: VirginEngine.renderSprite, Text: VirginEngine.renderText });
      VirginEngine.renderPerformanceInfo();
    } else {
      VirginEngine.renderSprite();
      VirginEngine.renderText();
    }

    // recall render
    Log.framesTemp++;
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
  }
}
