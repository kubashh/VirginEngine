import { Timer } from "../values/classes";
import { ctx, events, nodes, Log, scene, files } from "../values/consts";
import { drawText, wait } from "./basicFunctions";

// Run
export async function run() {
  await loadAssets();
  scene.load("REPLACE_PATH_TO_MAIN_SCENE" as any);

  requestAnimationFrame(render);

  let timer = performance.now();
  let updates = 0;
  let delta = 0;
  while (true) {
    const now = performance.now();
    delta += (now - scene.lastTime) / scene.ms;
    if (delta > 60) delta = 60;

    scene.lastTime = now;
    while (delta >= 1) {
      update();
      updates++;
      delta--;
    }

    // Log Staff
    if (now - timer > 1000) {
      timer += 1000;
      Log.updates = updates;
      Log.frames = Log.framesTemp;
      updates = 0;
      Log.framesTemp = 0;
      Timer.reset();
    }

    await wait();
  }
}

async function loadAssets() {
  await Promise.allSettled(assetsToLoad(files));
}

function assetsToLoad(obj: TObj<any>) {
  const toLoad: Promise<void>[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === `object`) toLoad.push(...assetsToLoad(value));
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

// Update
function update() {
  updateTimer.measure({ Physics: updatePhysics, Nodes: updateNodes });

  // Clear events, not eventsHover
  events.clear();
}

function updatePhysics() {
  for (const node of nodes) node.physics?.update();
}

function updateNodes() {
  for (const node of nodes) node.update?.();
}

// Render
function render() {
  clearCtx();

  renderTimer.measure({ Sprite: renderSprite, Text: renderText });

  drawPerformanceInfo();

  // Recall render
  Log.framesTemp++;
  requestAnimationFrame(render);
}

function clearCtx() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function renderSprite() {
  for (const node of nodes) node.sprite?.render();
}

function renderText() {
  for (const node of nodes) node.text?.render();
}

function drawPerformanceInfo() {
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

  for (const text of [...renderTimer.allFormatted, ...updateTimer.allFormatted]) {
    drawText({ text, ...props });
    props.y += 18;
  }
}

const renderTimer = new Timer(`Sprite`, `Text`);
const updateTimer = new Timer(`Physics`, `Nodes`);
