import { useEffect, useState } from "react"
import { editor } from "../../lib/consts"
import { Header } from "../../lib/components"

export const Inspector = () => {
  const [element, setElement] = useState()

  useEffect(() => (editor.setInspector = setElement), [])

  return (
    <>
      <Header text="Inspenctor" />
      {element}
    </>
  )
}
