import { useEffect, useState } from "react"

export const NumberInput = ({ text, parent, access }) => {
  const [state, setState] = useState(0)

  useEffect(() => {
    const handler = () => {
      const value = parent[access]

      if(value.length === 0 || !Number(value)) {
        parent[access] = `0`
        setState(state + 1)
        return
      }

      parent[access] = Number(value)
      setState(state + 1)
    }

    document.addEventListener(`mousedown`, handler)

    return () => {
      document.removeEventListener(`mousedown`, handler)
    }
  }, [])

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

        let isDot = false
        for(let i = 0; i < value.length; i++) {
          if(!`${window.editor.numbers}.`.includes(value[i])) {
            return
          }

          if(value[i] === `.`) {
            if(isDot) {
              return
            }

            isDot = true
          }
        }

        parent[access] = value
        setState(state + 1)
      }}
    />
  </div>
}