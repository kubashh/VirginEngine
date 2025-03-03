import { InspectorSection } from "../inspector/InspectorSection"

export const Config = () => {
  return (
    <InspectorSection
      text="Config"
      childs={Object.keys(window.config)
        .filter((key) => key !== `type`)
        .map((key) => ({
          text: key,
          parent: window.config,
          access: key
        }))}
    />
  )
}
