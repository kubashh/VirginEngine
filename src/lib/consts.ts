import { createSignal } from "wdwh";
import { type TNameInput } from "../ui/NameInput";
import { type TDragData } from "../ui/DragData";
import { type TPopupMenu } from "../ui/PopupMenu";
import { virginEngineVersion } from "./core";
import { Enum, type TEnum } from "../inspector/typeInput/EnumInput";
import { boxSprite, defaultNode, happyBoxSprite } from "./assets/assets";
import { deepCopy, saveProject } from "./util";

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

export const config: TConfig = {
  gameName: ``,
  version: `0.0.0`,
  author: `YourNick`,
  description: `Description`,
  fullScreen: true,
  pathToMainScene: `files.Scenes.MainScene`,
  performanceInfo: Enum<`yes` | `dev` | `no`>(`dev`, `yes`, `dev`, `no`),
  editorVersion: virginEngineVersion,
};

export const defaultAssets = {
  img: {
    type: `img`,
    src: boxSprite,
    quality: 1,
  } as TFile,
  img2: {
    type: `img`,
    src: happyBoxSprite,
    quality: 1,
  } as TFile,
  audio: {
    type: `audio`,
    src: ``,
    quality: 1,
  } as TFile,
};

const filesTemplate: TFile = {
  type: `folder`,
  Scenes: {
    type: `folder`,

    MenuScene: { type: `scene`, name: `MenuScene` },

    // Main Scene
    MainScene: {
      name: `MainScene`,
      type: `scene`,
      // camera: { scale: 1, aspectRatio: 1, x: 0, y: 0 },
      Parent: defaultNode({
        start: `function() {
  for(let i = 0; i < 10; i++)
    this.parent.Child.clone();
}`,
      }),
      Child: defaultNode({
        scale: { x: 20, y: 20 },
        sprite: { color: ``, path: `files.Assets.Images.BoxImage` },
        start: `function() {
  this.position = { x: rand(-Camera.xOffset, Camera.xOffset), y: rand(-Camera.yOffset, Camera.yOffset) };
}`,
        update: `function() {
  const x = this.position.x - rand(2);
  const y = this.position.y - rand(0.3);
  this.position = { x: x < -Camera.xOffset ? Camera.xOffset : x, y: y < -Camera.yOffset ? Camera.yOffset : y };
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
      HappyBoxImage: deepCopy(defaultAssets.img2),
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
  engineVersion: virginEngineVersion,
};

export const hierarchySignal = createSignal<TFile>(filesTemplate.Scenes.MainScene, () => {
  inspectorSignal.set(null); // Close inspector
});
export const refreshHierarchy = { refresh() {} };
export const files = filesTemplate;
export const refreshFiles = { refresh() {} };
export const inspectorSignal = createSignal<React.ReactNode>(null);
export const nameInputSignal = createSignal<TNameInput | null>(null);
export const dragDataSignal = createSignal<TDragData | null>(null);
export const testSceneSignal = createSignal(``);
export const contextMenuSignal = createSignal<{
  [key: string]: (() => void) | number | false;
  x: number;
  y: number;
} | null>(null);
export const popupMenuSignal = createSignal<TPopupMenu>({ label: `` });
export const setUpSignal = createSignal(false, () => {
  if (!setUpSignal.get()) document.title = `VirgineEngine v${virginEngineVersion}`;
});
export const cursorPointerSignal = createSignal(false, () => {
  document.body.style.cursor = cursorPointerSignal.get() ? `pointer` : ``;
});

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

// Set title manually, because wdwh doesn't support string templates for metadata (src/app/index.tsx)
document.title = `Virgine Engine v${virginEngineVersion}`;

export type TConfig = {
  gameName: string;
  version: string;
  author: string;
  description: string;
  fullScreen: boolean;
  pathToMainScene: string;
  performanceInfo: TEnum<string>;
  editorVersion: string;
};

export type TFile = {
  type: `none` | `folder` | `node` | `scene` | `img` | `audio`;
} & TObj<any | TNode>;

export type TTransform = {
  position: { x: number; y: number };
  rotation: number;
  scale: { x: number; y: number };
};

export type TNode = {
  transform: TTransform;
  sprite?: { color: string; path: string };
  [key: string]: TTransform | { color: string; path: string } | string | number | undefined;
};
