import { InspectorSection } from "../inspector/InspectorSection"

export const Config = () => {
  return <InspectorSection
    text="Config"
    childs={Object.entries(window.config)
      .filter(([key]) => key !== `type`)
      .map(([key]) => {
        return {
          text: key,
          parent: window.config,
          access: key
        }
      })
    }
  />
}