import { useRefresh } from "../../../lib/hooks"

export const StringInput = ({ object, access }) => {
  const refresh = useRefresh()

  return (
    <input
      type="text"
      style={{ width: `100%` }}
      value={object[access]}
      onChange={({ target: { value } }) => {
        object[access] = value
        refresh()
      }}
    />
  )
}
