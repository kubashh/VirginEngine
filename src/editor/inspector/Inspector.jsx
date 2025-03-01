import { useEffect, useState } from "react"

export const Inspector = () => {
  const [element, setElement] = useState(null)

  useEffect(() => {
    window.editor.setInspector = setElement
  }, [])

  return element
}
