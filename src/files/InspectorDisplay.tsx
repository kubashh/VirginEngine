import { useCreateSignal } from "../lib/framework";
import { type TFile } from "../lib/consts";
import { fileFromPath, zswitch } from "../lib/util";
import { TypeInput } from "../lib/typeInput/TypeInput";
import { AudioGrabber } from "../lib/components/AudioGrabber";
import { ImageGrabber } from "../lib/components/ImageGrabber";

export function InspectorDisplay({ path, file, name }: InspectorDisplayProps) {
  return (
    <div className="m-3">
      <h2 className="text-2xl font-bold">File</h2>
      <div>Type: {file.type}</div>
      <div>Name: {name}</div>
      <InspectorImgAudioGrabber path={path} file={file} name={name} />
    </div>
  );
}

function InspectorImgAudioGrabber({ file, path, name }: InspectorDisplayProps) {
  const srcSignal = useCreateSignal(file.src, () => {
    if (path) fileFromPath(path).src = srcSignal.get(); // it is needed for getting object evry time signal updated (can't use object "file")
  });

  if (![`img`, `audio`].includes(file.type)) return null;

  return (
    <div>
      {zswitch(file.type, {
        img: () => <ImageGrabber srcSignal={srcSignal} name={name} />,
        audio: () => <AudioGrabber srcSignal={srcSignal} name={name} />,
      })}
      <TypeInput object={file} access="quality" />
    </div>
  );
}

type InspectorDisplayProps = {
  path?: string;
  file: TFile;
  name: string;
};
