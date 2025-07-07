import { useRefresh } from "../../lib/hooks"

export default function StringInput({ object, access }: StringInputProps) {
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
