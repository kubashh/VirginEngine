// Declarations

module "*.png" {
  const src: string;
  export default src;
}

module "*.md" {
  const html: string;
  export default html;
}

// Basic
type TObj<T> = Record<string, T>;
type Void = () => void;

type VTypes = `boolean` | `number` | `string` | `array` | `object` | `function` | `enum`;

type Variable = {
  object: TObj<any>;
  access: string;
  type?: VTypes;
};

type TEnum<T> = {
  type: `enum`;
  options: T[];
  selected: T;
};
