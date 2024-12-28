import { InspectorSection } from "../../inspector/InspectorSection"

export const Transform = ({ object }) => {
  const { position, rotation, scale } = object.transform

  return <div>
    <InspectorSection
      text="Position"
      childs={[
        {
          text: `x`,
          parent: position,
          access: `x`
        },
        {
          text: `y`,
          parent: position,
          access: `y`
        }
      ]}
    />
    <InspectorSection
      text="Rotation"
      childs={[
        {
          text: `z`,
          parent: rotation,
          access: `z`
        }
      ]}
    />
    <InspectorSection
      text="Scale"
      childs={[
        {
          text: `x`,
          parent: scale,
          access: `x`
        },
        {
          text: `y`,
          parent: scale,
          access: `y`
        }
      ]}
    />
  </div>
}