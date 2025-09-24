import InputGrabber from "./InputGrabber"

export default function AudioGrabber({ src, name }: ImageGrabberProps) {
  return (
    <InputGrabber
      name={name}
      accept="audio/*"
      img={`Audio`} // TO DO audio icon
      onFile={async (file) => {
        const bytes = await file.bytes()

        const newScr = `data:audio/${file.type};base64,${bufferToBase64(bytes)}`
        console.log(newScr)
        src.value = newScr
      }}
    />
  )
}

function bufferToBase64(bytes: Uint8Array) {
  const buf = []
  for (const b of bytes) buf.push(String.fromCharCode(b))
  return window.btoa(buf.join(``))
}
