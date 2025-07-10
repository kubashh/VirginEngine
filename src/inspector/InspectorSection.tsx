import TypeInput from "./TypeInput"

export default function InspectorSection({ text, remove, childs, element }: InspectorSectionProps) {
  return (
    <div className="mt-4 ml-3 bb2_111 pb-2">
      <div className="flex">
        <h2 className="mb-2 bl4_333 pl-2 text-2xl font-bold">{text}</h2>
        {remove ? (
          <input type="button" value="Remove" className="ml-auto mr-4 hover cursor-pointer" onClick={remove} />
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
