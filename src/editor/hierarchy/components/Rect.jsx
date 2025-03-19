import { InspectorSection } from "../../inspector/InspectorSection"
import { AddComponent } from "./componentsLib"

// textBaseline = [`top`, `middle`, `bottom`]
// textAlign = [`left`, `center`, `right`]

export const Rect = ({ object, refresh }) =>
  object.rect ? (
    <InspectorSection
      text="Rect"
      remove={() => {
        delete object.rect
        delete object.text
        refresh()
      }}
      childs={[
        { object: object.rect, access: `x` },
        { object: object.rect, access: `y` }
      ]}
    />
  ) : (
    <AddComponent
      text="Rect"
      onClick={() => {
        object.rect = { x: 0, y: 0 }
        refresh()
      }}
    />
  )
