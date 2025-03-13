import { TypeInput } from "./TypeInput"

export const InspectorSection = ({ text, remove, childs, element }) => (
  <div
    style={{
      paddingBottom: 8,
      borderBottom: `2px #111 solid`,
      margin: `16px 0 0 12px`
    }}
  >
    <div style={{ display: `flex` }}>
      <div
        style={{
          marginBottom: 5,
          fontWeight: `bold`,
          borderLeft: `2px solid black`,
          fontSize: 24
        }}
        children={text}
      />
      {remove ? (
        <input
          type="button"
          value="Remove"
          style={{
            marginBottom: 5,
            borderLeft: `2px solid black`,
            fontSize: 16,
            margin: `auto 12px auto auto`,
            backgroundColor: `black`
          }}
          onClick={remove}
        />
      ) : null}
    </div>
    {childs?.map((props) => (
      <TypeInput key={props.text} {...props} />
    ))}
    {element}
  </div>
)
