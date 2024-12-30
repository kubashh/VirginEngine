import { useState } from "react"

const BoolInput = ({ parent, access, refresh }) => {
  return {
    type: `checkbox`,
    value: parent[access],
    onChange: ({ target: { checked } }) => {
      parent[access] = checked
      refresh()
    }
  }
}

const NumberInput = ({ parent, access }) => {
  const [currentNumber, setCurrentNumber] = useState(parent[access])

  return {
    type: `text`,
    value: currentNumber,
    onChange: ({ target: { value } }) => {
      for(const char of value) {
        if(!`${window.editor.numbers}.`.includes(char)) {
          return
        }
      }

      let newNumber = Number(value)
      if(value[value.lenght - 1] === `.`) {
        newNumber = 0
      }
      if(!newNumber) {
        newNumber = 0
      }

      parent[access] = newNumber

      setCurrentNumber(newNumber === Number(value) ? newNumber : value)
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

const CustiomInput = (props) => {
  const [state, setState] = useState(0)

  const refresh = () => {
    setState(state + 1)
  }

  props = {
    refresh,
    ...props
  }

  const type = typeof props.parent[props.access]

  let myInput = StringInput(props)

  if(type === `boolean`) {
    myInput = BoolInput(props)
  }

  if(type === `number`) {
    myInput = NumberInput(props)
  }

  return <div
    style={{
      padding: 0,
      margin: 2,
      display: `flex`,
      justifyContent: `space-between`
    }}
  >
    <div>{props.text}</div>
    <input
      {...myInput}
    />
  </div>
}

export const InspectorSection = ({ text, childs }) => {
  return <div
    style={{
      paddingBottom: 8,
      borderBottom: `2px #111 solid`,
      margin: `16px 0 0 12px`
    }}
  >
    <div
      style={{
        marginBottom: 5,
        fontWeight: `bold`,
        borderLeft: `2px solid black`,
        fontSize: 24
      }}
    >
      {text}
    </div>
    {childs?.map((props) => <CustiomInput
      key={props.text}
      {...props}
    />)}
  </div>
}