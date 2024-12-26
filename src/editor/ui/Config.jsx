import { useState } from "react"

const BoolInput = ({ name, text }) => {
  const [currentBool, setCurrentBool] = useState(text)

  return {
    type: `checkbox`,
    value: currentBool,
    onChange: ({ target }) => {
      const { checked } = target
      window.files.config[name] = checked
      setCurrentBool(checked)
    }
  }
}

const NumberInput = ({ name, text }) => {
  const [currentNumber, setCurrentNumber] = useState(text)

  return {
    type: `text`,
    value: currentNumber,
    onChange: ({ target }) => {
      const { value } = target

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

      window.files.config[name] = newNumber

      setCurrentNumber(newNumber === Number(value) ? newNumber : value)
    }
  }
}

const StringInput = ({ name, text }) => {
  const [currentText, setCurrentText] = useState(text)

  return {
    type: `text`,
    value: currentText,
    onChange: ({ target }) => {
      const { value } = target
      setCurrentText(value)

      window.files.config[name] = value
    }
  }
}

const CustomInput = (props) => {
  const type = typeof props.text

  let myInput = StringInput(props)

  if(type === `boolean`) {
    myInput = BoolInput(props)
  }

  if(type === `number`) {
    myInput = NumberInput(props)
  }

  return <div
    style={{
      display: `flex`
    }}
  >
    <div>{props.name}</div>
    <input
      {...myInput}
    />
  </div>
}

export const Config = () => {
  return <div>
    {Object.entries(window.files.config).map(([key, value]) => {
      return <CustomInput
        key={key}
        name={key}
        text={value}
      />
    })}
  </div>
}