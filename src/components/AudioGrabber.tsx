import FileGrabber from "./FileGrabber";

export default function AudioGrabber({ src, name }: ImageGrabberProps) {
  return (
    <FileGrabber
      label="Audio"
      name={name}
      accept="audio/*"
      img="Select Audio" // TO DO audio icon
      onFile={async (file) => {
        const bytes = await file.bytes();
        src.value = `data:audio/${file.type};base64,${bufferToBase64(bytes)}`;
      }}
    />
  );
}

function bufferToBase64(bytes: Uint8Array) {
  const buf = [];
  for (const b of bytes) buf.push(String.fromCharCode(b));
  return window.btoa(buf.join(``));
}
