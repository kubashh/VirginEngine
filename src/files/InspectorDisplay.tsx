import { deprecated_useSignal } from "../lib/deprecated_Signal";
import AudioGrabber from "../components/AudioGrabber";
import ImageGrabber from "../components/ImageGrabber";
import TypeInput from "../inspector/TypeInput";

export default function InspectorDisplay({ file, name }: InspectorDisplayProps) {
  const src = deprecated_useSignal(file.src, () => (file.src = src.value));

  return (
    <div className="m-3">
      <h2 className="text-2xl font-bold">File</h2>
      <div>Type: {file.type}</div>
      <div>Name: {name}</div>
      {(file.type === `img` && (
        <div>
          <ImageGrabber src={src} name={name} />
          <TypeInput object={file} access="quality" />
        </div>
      )) ||
        (file.type === `audio` && (
          <div>
            <AudioGrabber src={src} name={name} />
            <TypeInput object={file} access="quality" />
          </div>
        )) ||
        null}
    </div>
  );
}
