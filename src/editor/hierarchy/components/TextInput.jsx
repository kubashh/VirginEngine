import { useState } from "react"

export const TextInput = ({ text, parent, access }) => {
  const [state, setState] = useState(0)

  console.log(text, parent, access)

  return <div
    style={{
      display: `flex`
    }}
  >
    <div
      style={{
        marginRight: 12
      }}
    >
      {text}
    </div>
    <input
      type="text"
      value={parent[access]}
      onChange={({ target }) => {
        let { value } = target

        parent[access] = value
        setState(state + 1)
      }}
    />
  </div>
}