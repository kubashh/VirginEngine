import { useState } from "react"
import { addSpaceBeforeUpper } from "../../lib/utils"
import { numbers } from "../../lib/consts"
import { useRefresh } from "../../lib/hooks"

const BoolInput = ({ parent, access, refresh }) => {
  return {
    type: `checkbox`,
    checked: parent[access],
    style: {
      accentColor: `green`,
      backgroundColor: `black`,
      background: `black`
    },
    onChange: ({ target: { checked } }) => {
      parent[access] = checked
      refresh()
    },
    label: {
      style: {}
    }
  }
}

const NumberInput = ({ parent, access }) => {
  const [currentNumber, setCurrentNumber] = useState(parent[access])

  return {
    type: `text`,
    value: currentNumber,
    onChange: ({ target: { value } }) => {
      let dot = false
      for (const char of value) {
        // Is includes allow chars
        if (!`${numbers}.`.includes(char)) {
          return
        }

        // Double dot check
        if (char === `.`) {
          if (dot) return

          dot = true
        }
      }

      let newNumber = Number(value) || 0
      let set = true
      if (value[value.length - 1] === `.`) {
        set = false
      } else {
        parent[access] = newNumber
      }

      setCurrentNumber(set ? newNumber : value)
    }
  }
}

const StringInput = ({ parent, access, refresh }) => {
  return {
    type: `text`,
    value: parent[access],
    onChange: ({ target: { value } }) => {
      parent[access] = value
      refresh()
    }
  }
}

export const TypeInput = (props) => {
  const refresh = useRefresh(0)

  props = { refresh, ...props }

  const type = typeof props.parent[props.access]

  let myInput = StringInput(props)

  if (type === `boolean`) {
    myInput = BoolInput(props)
  } else if (type === `number`) {
    myInput = NumberInput(props)
  }

  const { label } = myInput

  if (label) {
    delete myInput.label
  }

  const id = Math.random().toString(10).slice(2)

  return (
    <div
      style={{
        padding: 0,
        margin: 2,
        display: `flex`,
        justifyContent: `space-between`
      }}
    >
      <div>{addSpaceBeforeUpper(props.text)}</div>
      <input id={id} {...myInput} />
      {label && <label htmlFor={id} {...label}></label>}
    </div>
  )
}
