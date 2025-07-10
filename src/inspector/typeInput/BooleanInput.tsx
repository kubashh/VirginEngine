export default function BooleanInput({ object, access, refresh }: StringInputProps & { refresh: Void }) {
  return (
    <input
      type="checkbox"
      className="cursor-pointer accent-(--col1) checkbox"
      checked={object[access]}
      style={{ opacity: !object[access] ? 0.2 : 0 }}
      onChange={({ target }) => {
        object[access] = target.checked
        refresh()
      }}
    />
  )
}
