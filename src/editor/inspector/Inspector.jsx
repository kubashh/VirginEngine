import { useEffect, useState } from "react"
import { editor } from "../../lib/consts"

export const Inspector = () => {
  const [element, setElement] = useState(null)

  useEffect(() => (editor.setInspector = setElement), [])

  return element
}
