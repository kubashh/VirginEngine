import { emptyProject } from "./assets/assets";

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
};

// types

type TConfig = {
  gameName: string;
  version: string;
  author: string;
  description: string;
  fullScreen: boolean;
  startingSceneName: string;
  hydrateCanvasId: string;
  devPerformanceInfo: boolean;
};

export type TFile = {
  type: `none` | `folder` | `node` | `scene` | `img` | `audio`;
} & TObj<any | TNode>;

export type TProject = {
  files: TFile;
  config: TConfig;
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
