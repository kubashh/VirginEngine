import { useSignal } from "../../lib/signals"

export default function StringInput({ object, access }: StringInputProps) {
  const str = useSignal(object[access], () => (object[access] = str.value))

  return (
    <input
      type="text"
      className="inputText w-full"
      value={str.value}
      onChange={({ target }) => (str.value = target.value)}
    />
  )
}
