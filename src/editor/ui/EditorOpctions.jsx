import { useState } from "react"
import { save } from "./save"
import { test, build } from "../../build/build"
import { Config } from "./Config"


const CustomInput = ({ text, onClick }) => {
  return <input
    type="button"
    value={text}
    style={{
      border: 0,
      height: 30
    }}
    onClick={onClick}
  />
}

export const EditorOpctions = () => {
  const [show, setShow] = useState(false)

  return <div
    style={{
      position: `absolute`,
      zIndex: 1,
      right: 0
    }}
    onMouseEnter={() => setShow(true)}
    onMouseLeave={() => setShow(false)}
  >
    <div
      style={{
        position: `absolute`,
        cursor: `pointer`,
        right: 0,
        width: 25,
        height: 25,
        border: `3px solid #333`,
        textAlign: `center`
      }}
    >
      O
    </div>
    {show && <div
      style={{
        position: `absolute`,
        right: 0,
        top: 30,
        display: `grid`,
        gap: 4,
        backgroundColor: `#555`,
        padding: 4,
        width: 150
      }}
    >
      <CustomInput
        text="Save"
        onClick={save}
      />
      <CustomInput
        text="Test"
        onClick={test}
      />
      <CustomInput
        text="Build"
        onClick={build}
      />
      <CustomInput
        text="Load"
        onClick={() => {
          window.editor.setUp = false
          window.editor.reload()
        }}
      />
      <CustomInput
        text="Config"
        onClick={() => {
          window.editor.setInspector(<Config />)
        }}
      />
    </div>}
  </div>
}