import { InspectorSection } from "../../inspector/InspectorSection"

export const Text = ({ object, ...props }) => (
  <InspectorSection
    {...props}
    childs={[{ object: object.text, access: `value` }]}
  />
)
