import { useEffect, useState } from "react"

export const Inspector = () => {
  const [element, setElement] = useState(<div></div>)

  useEffect(() => {
    window.editor.setInspector = setElement
  }, [])

  return element
}