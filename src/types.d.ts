// Simple
type TObj<T = any> = Record<string, T>;
type Void = () => void;
type Signal<T> = { get(): T; set(arg: T): void };

// to delete
type deprecated_Signal<T> = { get: () => T; set: (newValue: T) => void };

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

// Props

type FileProps = {
  old?: any;
  file: TFile;
  name: string;
  path?: string;
  deep: number;
};

type NodeProps = {
  old?: any;
  object: any;
  name: string;
  deep: number;
};

type InspectorSectionProps = {
  text: string;
  remove?: Void;
  childs?: Variable[];
  element?: React.ReactNode;
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

type HeaderProps = {
  name: string;
  options?: Record<string, Void>;
};

type WindowProps = {
  name: string;
  headerOptions?: Record<string, Void>;
  className?: string;
  children: React.ReactNode;
};

type FileGrabberProps = {
  label: string;
  name: string;
  accept: string;
  img: React.ReactNode;
  onFile: (file: File) => void;
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
} & Record<string, any>;
