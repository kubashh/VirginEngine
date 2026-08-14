import InspectorSection from "../../inspector/InspectorSection";
import { type TTransform } from "../../lib/consts";

export default function Transform({ transform }: TransformProps) {
  return (
    <>
      <InspectorSection
        text="Position"
        childs={[
          { object: transform.position, access: `x` },
          { object: transform.position, access: `y` },
        ]}
      />
      <InspectorSection text="Rotation" childs={[{ object: transform, access: `rotation` }]} />
      <InspectorSection
        text="Scale"
        childs={[
          { object: transform.scale, access: `x` },
          { object: transform.scale, access: `y` },
        ]}
      />
    </>
  );
}

type TransformProps = {
  transform: TTransform;
};
