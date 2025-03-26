import { TypeInput } from "./TypeInput"

export const InspectorSection = ({ text, remove, childs, element }) => (
  <div className="InspectorSection">
    <div>
      <h1 children={text} />
      {remove ? (
        <input
          type="button"
          value="Remove"
          className="InspectorSectionRemove"
          onClick={remove}
        />
      ) : null}
    </div>
    {childs?.map((props) => (
      <TypeInput key={props.access} {...props} />
    ))}
    {element}
  </div>
)
