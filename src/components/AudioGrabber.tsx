import { type ImageGrabberProps } from "./ImageGrabber";
import FileGrabber from "./FileGrabber";
import { audioIconSrc } from "../lib/assets/assets";

export default function AudioGrabber({ srcSignal, name }: ImageGrabberProps) {
  return (
    <FileGrabber
      label="Audio"
      name={name}
      accept="audio/*"
      img={<img src={audioIconSrc} className="h-6" />}
      // "Select Audio" // TO DO audio icon
      onFile={async (file) => {
        const bytes = await file.bytes();
        srcSignal.set(`data:audio/${file.type};base64,${bufferToBase64(bytes)}`);
      }}
    />
  );
}

function bufferToBase64(bytes: Uint8Array) {
  const buf = [];
  for (const b of bytes) buf.push(String.fromCharCode(b));
  return btoa(buf.join(``));
}
