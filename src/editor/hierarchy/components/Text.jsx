import { useRefresh } from "../../../lib/hooks"
import { InspectorSection } from "../../inspector/InspectorSection"
import { AddComponent } from "./componentsLib"

export const Text = ({ object }) => {
  const refresh = useRefresh()

  return object.text ? (
    <InspectorSection
      text="Text"
      remove={() => {
        delete object.text
        refresh()
      }}
      childs={[{ text: `x`, object: object.text, access: `value` }]}
    />
  ) : (
    <AddComponent
      text="Text"
      onClick={() => {
        object.text = { value: `` }
        refresh()
      }}
    />
  )
}
