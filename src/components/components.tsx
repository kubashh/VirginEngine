import { clsx } from "../lib/framework";
import { useConst } from "./../lib/hooks";

// Button
export function Button({ label, children, className, ...props }: ButtonProps) {
  return (
    <button className={clsx(className, `cursor-pointer`)} {...props}>
      {label || children}
    </button>
  );
}

// TextInput
export function TextInput({ onChange, allow, ...props }: TextInputProps) {
  return (
    <input
      type="text"
      onChange={
        onChange
          ? ({ target }) => {
              if (allow && !allow.test(target.value)) {
                target.value = target.value
                  .split(``)
                  .filter((char) => allow.test(char))
                  .join(``);
                return;
              }

              onChange(target.value);
            }
          : undefined
      }
      {...props}
    />
  );
}

// FileInput
export function FileInput({
  children,
  onFile,
  className,
  boxClassName,
  style,
  boxStyle,
  ...props
}: FileInputProps) {
  const id = useConst(props?.id || Math.random().toFixed(7));
  return (
    <div className={boxClassName} style={boxStyle}>
      <label htmlFor={id} className={className} style={style}>
        {children}
      </label>
      <input
        type="file"
        className="hidden"
        id={id}
        onChange={({ target }) => {
          if (target.files && target.files[0]) onFile(target.files[0]);
        }}
        {...props}
      />
    </div>
  );
}

type ButtonProps = {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
} & React.HTMLAttributes<HTMLButtonElement>;

type TextInputProps = {
  allow?: RegExp;
  onChange?: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, `type` | `onChange`>;

type FileInputProps = {
  onFile: (file: File) => void;
  boxClassName?: string;
  boxStyle?: React.CSSProperties;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, `type`>;
