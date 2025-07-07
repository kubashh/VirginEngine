import TypeInput from "./TypeInput"

export default function InspectorSection({ text, remove, childs, element }: InspectorSectionProps) {
  return (
    <div className="mt16 ml12 bb2_111 pb8">
      <div className="flex">
        <h1 className="mb6 bl4_333 pl6" children={text} />
        {remove ? (
          <input type="button" value="Remove" className="m_auto mr16 fontSize16 hover" onClick={remove} />
        ) : null}
      </div>
      {childs?.map((props) => (
        // @ts-ignore
        <TypeInput key={props.access} {...props} />
      ))}
      {element}
    </div>
  )
}
