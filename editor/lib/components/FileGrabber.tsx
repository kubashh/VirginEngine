import { FileInput } from "./components";

export function FileGrabber({ label, name, accept, img, onFile }: FileGrabberProps) {
  return (
    <FileInput id={name} accept={accept} onFile={onFile}>
      <div className="flex h-6 w-full">
        {label}: <div className="ml-3 w-full cursor-pointer border border-zinc-700">{img}</div>
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
