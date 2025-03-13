import { InspectorSection } from "../../inspector/InspectorSection"

export const Transform = ({ object }) => (
  <>
    <InspectorSection
      text="Position"
      childs={[
        { text: `x`, object: object.transform.position, access: `x` },
        { text: `y`, object: object.transform.position, access: `y` }
      ]}
    />
    <InspectorSection
      text="Rotation"
      childs={[{ text: `z`, object: object.transform.rotation, access: `z` }]}
    />
    <InspectorSection
      text="Scale"
      childs={[
        { text: `x`, object: object.transform.scale, access: `x` },
        { text: `y`, object: object.transform.scale, access: `y` }
      ]}
    />
  </>
)
