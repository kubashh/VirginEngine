export const BoolInput = ({ object, access, refresh }) => {
  const id = Math.random().toString(10).slice(2)

  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={object[access]}
        style={{
          display: `none`,
          accentColor: `green`,
          backgroundColor: `black`
        }}
        onChange={({ target }) => {
          object[access] = target.checked
          refresh()
        }}
      />
      <label htmlFor={id} />
    </>
  )
}
