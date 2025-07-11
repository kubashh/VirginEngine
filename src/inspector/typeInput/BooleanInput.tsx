export default function BooleanInput({ object, access, refresh }: StringInputProps & { refresh: Void }) {
  return (
    <input
      type="checkbox"
      className="h-5 my-auto mr-auto aspect-square accent-(--col1) cursor-pointer"
      checked={object[access]}
      style={{ opacity: !object[access] ? 0.2 : 0 }}
      onChange={({ target }) => {
        object[access] = target.checked
        refresh()
      }}
    />
  )
}
