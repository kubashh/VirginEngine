import clsx from "clsx"
import Header from "./Header"

export default function Window({ name, headerOptions, className, children }: WindowProps) {
  return (
    <section className={clsx(`grid grid-rows-[24px_1fr]`, className)}>
      <Header name={name} options={headerOptions} />
      {children}
    </section>
  )
}
