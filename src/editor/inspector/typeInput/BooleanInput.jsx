export const BooleanInput = ({ object, access, refresh }) => {
  return (
    <>
      <input
        type="checkbox"
        checked={object[access]}
        className="BooleanInput"
        style={{ opacity: !object[access] && 0.2 }}
        onChange={({ target }) => {
          object[access] = target.checked
          refresh()
        }}
      />
    </>
  )
}
