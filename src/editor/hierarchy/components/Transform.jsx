import { InspectorSection } from "../../inspector/InspectorSection"

export const Transform = ({ object }) => (
  <>
    <InspectorSection
      text="Position"
      childs={[
        { text: `x`, parent: object.transform.position, access: `x` },
        { text: `y`, parent: object.transform.position, access: `y` }
      ]}
    />
    <InspectorSection
      text="Rotation"
      childs={[{ text: `z`, parent: object.transform.rotation, access: `z` }]}
    />
    <InspectorSection
      text="Scale"
      childs={[
        { text: `x`, parent: object.transform.scale, access: `x` },
        { text: `y`, parent: object.transform.scale, access: `y` }
      ]}
    />
  </>
)
