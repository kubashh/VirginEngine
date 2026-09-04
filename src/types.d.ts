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

type VTypes = `boolean` | `number` | `string` | `array` | `object` | `function` | `enum`;
