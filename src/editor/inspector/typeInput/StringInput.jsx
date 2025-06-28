import { useRefresh } from "../../../lib/hooks"

export function StringInput({ object, access }) {
  const refresh = useRefresh()

  return (
    <input
      type="text"
      className="inputText w100p"
      value={object[access]}
      onChange={({ target }) => {
        object[access] = target.value
        refresh()
      }}
    />
  )
}
