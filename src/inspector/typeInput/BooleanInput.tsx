export default function BooleanInput({ object, access, refresh }: StringInputProps & { refresh: Void }) {
  return (
    <input
      type="checkbox"
      className="checkbox"
      checked={object[access]}
      style={{ opacity: !object[access] ? 0.2 : 0 }}
      onChange={({ target }) => {
        object[access] = target.checked
        refresh()
      }}
    />
  )
}
