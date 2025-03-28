import { useRefresh } from "../../../lib/hooks"

export const StringInput = ({ object, access }) => {
  const refresh = useRefresh()

  return (
    <input
      type="text"
      className="inputText"
      style={{ width: `100%` }}
      value={object[access]}
      onChange={({ target }) => {
        object[access] = target.value
        refresh()
      }}
    />
  )
}
