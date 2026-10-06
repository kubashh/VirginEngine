import { virginEngineVersion } from "./core";
import { type TEnum } from "../inspector/typeInput/EnumInput";
import { emptyProject } from "./assets/assets";
import { saveProject } from "./util";

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

export const project: TProject = emptyProject();

export const files = project.files;
export const config = project.config;

export const editor = {
  selectedElement: {
    type: ``,
    value: ``,
  },
  engineVersion: virginEngineVersion,
};

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
