import { NumberInput } from "./NumberInput"

export const Transform = ({ old, object, name }) => {
  return <div>
    Transform
    <div>
      Position
      <NumberInput
        text="x"
        parent={object.transform.position}
        access={`x`}
      />
      <NumberInput
        text="y"
        parent={object.transform.position}
        access={`y`}
      />
    </div>
    <div>
      Rotation
      <NumberInput
        text="z"
        parent={object.transform.rotation}
        access={`z`}
      />
    </div>
    <div>
      Scale
      <NumberInput
        text="x"
        parent={object.transform.scale}
        access={`x`}
      />
      <NumberInput
        text="y"
        parent={object.transform.scale}
        access={`y`}
      />
    </div>
  </div>
}