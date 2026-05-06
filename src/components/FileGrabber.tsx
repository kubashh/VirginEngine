import { FileInput } from "wdwh/components";

export default function FileGrabber({ label, name, accept, img, onFile }: FileGrabberProps) {
  return (
    <FileInput id={name} accept={accept} onFile={onFile}>
      <div className="w-full h-6 flex">
        {label}: <div className="w-full ml-3 border border-zinc-700 cursor-pointer">{img}</div>
      </div>
    </FileInput>
  );
}

type FileGrabberProps = {
  label: string;
  name: string;
  accept: string;
  img: React.ReactNode;
  onFile: (file: File) => void;
};
