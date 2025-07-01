import InspectorSection from "../../editor/inspector/InspectorSection"

export default function Transform({ object }) {
  return (
    <>
      <InspectorSection
        text="Position"
        childs={[
          { object: object.transform.position, access: `x` },
          { object: object.transform.position, access: `y` },
        ]}
      />
      <InspectorSection text="Rotation" childs={[{ object: object.transform.rotation, access: `z` }]} />
      <InspectorSection
        text="Scale"
        childs={[
          { object: object.transform.scale, access: `x` },
          { object: object.transform.scale, access: `y` },
        ]}
      />
    </>
  )
}
