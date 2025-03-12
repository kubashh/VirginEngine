import { useRefresh } from "../../../lib/hooks"
import { InspectorSection } from "../../inspector/InspectorSection"
import { AddComponent } from "./AddComponent"

export const Text = ({ object }) => {
  const refresh = useRefresh()

  return object.text ? (
    <InspectorSection
      text="Text"
      object={object}
      access="text"
      childs={[{ text: `x`, parent: object.text, access: `value` }]}
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
