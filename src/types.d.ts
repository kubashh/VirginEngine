// Simple

type Obj<T> = Record<string, T>;
type Any = Obj<any>;
type Void = () => void;

type Signal<T> = { value: T };

type VTypes = `boolean` | `number` | `string` | `array` | `object` | `function` | `enum`;

type Variable = {
  object: Obj;
  access: string;
  type?: VTypes;
};

type TEnum<T> = {
  type: `enum`;
  options: T[];
  selected: T;
};

// Props

type FileProps = {
  old?: any;
  file: any;
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
  object: Obj;
  access: string;
  type?: VTypes;
};

type StringInputProps = {
  object: Obj;
  access: string;
};

type TransformProps = {
  object: Obj;
};

type AddScriptProps = {
  object: Obj;
  value: string;
  refresh: Void;
};

type ScriptProps = {
  object: Obj;
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
  src: Signal<string>;
  name: string;
};

type InspectorDisplayProps = {
  file: Any;
  name: string;
};
