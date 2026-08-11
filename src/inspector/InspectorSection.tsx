import { Button } from "wdwh/components";
import TypeInput from "./TypeInput";

export default function InspectorSection({ text, onRemove, childs, children }: InspectorSectionProps) {
  return (
    <div className="mt-4 border-b-2 border-zinc-950 pb-2">
      <div className="flex">
        <h2 className="mb-2 border-l-4 border-zinc-800 pl-2 text-2xl font-bold">{text}</h2>
        {onRemove ? (
          <Button label="Remove" className="mr-4 ml-auto hover:text-zinc-400" onClick={onRemove} />
        ) : null}
      </div>
      {childs?.map((props) => (
        <TypeInput key={props.access} {...props} />
      ))}
      {children}
    </div>
  );
}

type InspectorSectionProps = {
  text: string;
  onRemove?: Void;
  childs?: Variable[];
  children?: React.ReactNode;
};
