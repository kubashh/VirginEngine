import TypeInput from "./TypeInput";

export default function InspectorSection({ text, remove, childs, element }: InspectorSectionProps) {
  return (
    <div className="mt-4 border-b-2 border-zinc-950 pb-2">
      <div className="flex">
        <h2 className="mb-2 border-l-4 border-zinc-800 pl-2 text-2xl font-bold">{text}</h2>
        {remove ? (
          <input
            type="button"
            value="Remove"
            className="mr-4 ml-auto cursor-pointer hover:text-zinc-400"
            onClick={remove}
          />
        ) : null}
      </div>
      {childs?.map((props) => (
        <TypeInput key={props.access} {...props} />
      ))}
      {element}
    </div>
  );
}
