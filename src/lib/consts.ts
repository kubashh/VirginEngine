import { createSignal } from "wdwh";
import { Enum } from "../inspector/typeInput/EnumInput";
import { deepCopy, defaultNode, saveProject } from "./util";

export const keywords = [
  `type`,
  `transform`,
  `position`,
  `rotation`,
  `scale`,
  `text`,
  `rect`,
  `sprite`,
  `physics`,
  `audio`,
];
export const EMPTY_FILE: TFile = { type: `none` };

export const config = {
  gameName: `NameOfGame`,
  version: `0.0.0`,
  author: `YourNick`,
  description: `Description`,
  fullScreen: true,
  pathToMainScene: `files.Scenes.DefaultScene`,
  performanceInfo: Enum(`dev`, `yes`, `dev`, `no`),
};

export const defaultAssets = {
  img: {
    type: `img`,
    src: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAdnJLH8AAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAA9JREFUCB0BBAD7/wD///8F/gL+A30ZxgAAAABJRU5ErkJggg==`,
    quality: 1,
  },
  audio: {
    type: `audio`,
    src: ``,
    quality: 1,
  },
};

const filesTemplate: TFile = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    MenuScene: { type: `scene`, name: `MenuScene` },
    MainScene: { type: `scene`, name: `MainScene` },

    // Default Scene
    DefaultScene: {
      name: `DefaultScene`,
      type: `scene`,
      // camera: { scale: 1, aspectRatio: 1, x: 0, y: 0 },
      Parent: defaultNode({
        start: `function() {
  for(let i = 0; i < 10; i++)
    this.parent.Child.clone()
}`,
      }),
      Child: defaultNode({
        scale: { x: 20, y: 20 },
        sprite: { color: ``, path: `files.Assets.Images.BoxImage` },
        start: `function() {
  this.position = {x: rand(-Camera.xOffset, Camera.xOffset), y: rand(-Camera.yOffset, Camera.yOffset)}
}`,
        update: `function() {
  const x = this.position.x - rand(2)
  const y = this.position.y - rand(0.3)
  this.position = {x: x < -Camera.xOffset ? Camera.xOffset : x, y: y < -Camera.yOffset ? Camera.yOffset : y}
}`,
      }),
    },
  },

  // Assets
  Assets: {
    type: `folder`,
    Images: {
      type: `folder`,
      BoxImage: deepCopy(defaultAssets.img),
    },
    Audio: {
      type: `folder`,
      DAudio: deepCopy(defaultAssets.audio),
    },
  },
};

export const editor = {
  selectedElement: {
    type: ``,
    value: ``,
  },
};

export const hierarchySignal = createSignal<TObj>(filesTemplate.Scenes.MainScene); // TODO make createSignal
export const refreshHierarchy = { refresh() {} };
export const files = filesTemplate;
export const refreshFiles = { refresh() {} };
export const inspectorSignal = createSignal<React.ReactNode>(null);
export const nameInputSignal = createSignal<[((arg: string) => void)?, string?, boolean?]>([]);
export const dragDataSignal = createSignal<TDragData>({ name: ``, from: ``, file: EMPTY_FILE, old: {} });
export const testSceneSignal = createSignal(``);
export const contextMenuSignal = createSignal<[number?, number?, ...any]>([]);
export const setUpSignal = createSignal(false);

// Set global events
window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault();
});

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s`) {
    e.preventDefault();
    saveProject();
  }
});
