import { InspectorSection } from "../../inspector/InspectorSection"

// textBaseline = [`top`, `middle`, `bottom`]
// textAlign = [`left`, `center`, `right`]

export const Rect = ({ object, ...props }) => (
  <InspectorSection
    {...props}
    childs={[
      { object: object.rect, access: `x` },
      { object: object.rect, access: `y` }
    ]}
  />
)
