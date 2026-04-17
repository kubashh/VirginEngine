import { useEffect } from "react";
import { useInlineSignal } from "wdwh";
import AudioGrabber from "../components/AudioGrabber";
import ImageGrabber from "../components/ImageGrabber";
import TypeInput from "../inspector/TypeInput";

export default function InspectorDisplay({ file, name }: InspectorDisplayProps) {
  return (
    <div className="m-3">
      <h2 className="text-2xl font-bold">File</h2>
      <div>Type: {file.type}</div>
      <div>Name: {name}</div>
      <InspectorImgAudioGrabber file={file} name={name} />
    </div>
  );
}

function InspectorImgAudioGrabber({ file, name }: InspectorDisplayProps) {
  const srcSignal = useInlineSignal(file.src);
  const src = srcSignal.use();
  useEffect(() => {
    file.src = src;
  }, [src]);

  if (![`img`, `audio`].includes(file.type)) return null;

  return (
    <div>
      {file.type === `img` ? (
        <ImageGrabber srcSignal={srcSignal} name={name} />
      ) : (
        <AudioGrabber srcSignal={srcSignal} name={name} />
      )}
      <TypeInput object={file} access="quality" />
    </div>
  );
}
