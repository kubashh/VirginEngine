export function BooleanInput({ object, access, refresh }) {
  return (
    <>
      <input
        type="checkbox"
        className="checkbox"
        checked={object[access]}
        style={{ opacity: !object[access] && 0.2 }}
        onChange={({ target }) => {
          object[access] = target.checked
          refresh()
        }}
      />
    </>
  )
}
