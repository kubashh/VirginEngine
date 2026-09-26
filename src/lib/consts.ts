import { virginEngineVersion } from "./core";
import { Enum, type TEnum } from "../inspector/typeInput/EnumInput";
import { createSignal } from "./framework";
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
  version: `0.0.1`,
  author: `YourNick`,
  description: `Description`,
  fullScreen: true,
  startingSceneName: `MainScene`,
  performanceInfo: Enum<`yes` | `dev` | `no`>(`dev`, `yes`, `dev`, `no`), // TODO save as string or number, in editor display as Enum
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

    MainScene: {
      name: `MainScene`,
      type: `scene`,
      // camera: { scale: 1, aspectRatio: 1, x: 0, y: 0 },
      Parent: defaultNode({
        script: `class ParentController {
  start() {
    for(let i = 0; i < 20; i++)
      this.node.parent.Child.clone();
  }
}
`,
      }),
      Child: defaultNode({
        scale: { x: 20, y: 20 },
        sprite: { color: ``, path: `files.Assets.Images.BoxImage` },
        script: `class ChildScript {
  start() {
    this.node.position = { x: rand(-Camera.xOffset, Camera.xOffset), y: rand(-Camera.yOffset, Camera.yOffset) };
  }

  update() {
    const x = this.node.position.x - rand(2);
    const y = this.node.position.y - rand(0.3);
    this.node.position = { x: x < -Camera.xOffset ? Camera.xOffset : x, y: y < -Camera.yOffset ? Camera.yOffset : y };
  }
}
`,
      }),
    },
  },

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

export const files = filesTemplate;

export const project: TProject = {
  files,
  config,
  metadata: {
    editorVersion: virginEngineVersion,
    modifiedDate: Date.now(),
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
  inspectorSignal.set(null); // close inspector
});
export const refreshHierarchy = { refresh() {} };
export const refreshFiles = { refresh() {} };
export const inspectorSignal = createSignal<React.ReactNode>(null);

// set global events
window.addEventListener(`contextmenu`, (e) => {
  e.preventDefault();
});

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s`) {
    e.preventDefault();
    if (config.gameName !== ``) saveProject();
  }
});

// types

type TConfig = {
  gameName: string;
  version: string;
  author: string;
  description: string;
  fullScreen: boolean;
  startingSceneName: string;
  performanceInfo: TEnum<string>;
};

export type TFile = {
  type: `none` | `folder` | `node` | `scene` | `img` | `audio`;
} & TObj<any | TNode>;

export type TProject = {
  files: TFile;
  config: TConfig;
  // editorVersion: string;
  // modifiedDate: number;
  metadata: {
    // TODO same data as local storage
    modifiedDate: number;
    editorVersion: string;
  };
};

export type ProjectMetadata = {
  modifiedDate: number;
  editorVersion: string;
};

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
