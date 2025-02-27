import { TypeInput } from "./TypeInput"

export const InspectorSection = ({ text, childs, element }) => {
  return (
    <div
      style={{
        paddingBottom: 8,
        borderBottom: `2px #111 solid`,
        margin: `16px 0 0 12px`
      }}
    >
      <div
        style={{
          marginBottom: 5,
          fontWeight: `bold`,
          borderLeft: `2px solid black`,
          fontSize: 24
        }}
      >
        {text}
      </div>
      {childs?.map((props) => (
        <TypeInput key={props.text} {...props} />
      ))}
      {element}
    </div>
  )
}
