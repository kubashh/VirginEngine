import { config } from "../../lib/consts"
import { InspectorSection } from "../inspector/InspectorSection"

export const Config = () => {
  return (
    <InspectorSection
      text="Config"
      childs={Object.keys(config)
        .filter((key) => key !== `type`)
        .map((key) => ({
          text: key,
          parent: config,
          access: key
        }))}
    />
  )
}
