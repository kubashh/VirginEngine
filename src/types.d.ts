// Declare

module "*.png" {
  const src: string;
  export default src;
}

// Simple
type TObj<T = any> = Record<string, T>;
type Void = () => void;
type Signal<T> = { get(): T; set(arg: T): void; use(): T };

type VTypes = `boolean` | `number` | `string` | `array` | `object` | `function` | `enum`;

type Variable = {
  object: TObj;
  access: string;
  type?: VTypes;
};

type TEnum<T> = {
  type: `enum`;
  options: T[];
  selected: T;
};

// Signals

type TDragData = {
  name: string; // label
  from: `` | `hierarchy` | `files`;
  file: TFile;
  old: TObj;
};

type TNameInput = { cb: (arg: string) => void; value?: string; lowerCase?: boolean } | null;

type TPopupMenu = {
  label: string;
  options?: TObj<Void>;
};

// Props

type FileProps = {
  old: any;
  file: TFile;
  name: string;
  path?: string;
  deep: number;
};

type NodeProps = {
  old: any;
  object: any;
  name: string;
  deep: number;
};

type InspectorSectionProps = {
  text: string;
  onRemove?: Void;
  childs?: Variable[];
  children?: React.ReactNode;
};

type TypeInputProps = {
  object: TObj;
  access: string;
  type?: VTypes;
};

type StringInputProps = {
  object: TObj;
  access: string;
};

type TransformProps = {
  object: TObj;
};

type AddScriptProps = {
  object: TObj;
  value: string;
  refresh: Void;
};

type ScriptProps = {
  object: TObj;
  refresh: Void;
};

type AddComponentProps = {
  text: string;
  onClick: Void;
};

type ImageGrabberProps = {
  srcSignal: Signal<string>;
  name: string;
};

type InspectorDisplayProps = {
  file: TObj;
  name: string;
};

// Rest

// TODO better type
type TFile = {
  type: `none` | `folder` | `node` | `scene` | `img` | `audio`;
} & TObj<any>;

type TConfig = {
  gameName: string;
  version: string;
  author: string;
  description: string;
  fullScreen: boolean;
  pathToMainScene: string;
  performanceInfo: TEnum<string>;
};

type TProject = {
  files: TFile;
  config: TConfig;
  modifiedDate: number;
};
