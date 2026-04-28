import { clsx } from "wdwh";

export default function Button({
  label,
  children,
  className,
  ...props
}: {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
}) {
  return (
    <button className={clsx(`cursor-pointer`, className)} {...props}>
      {label || children}
    </button>
  );
}
