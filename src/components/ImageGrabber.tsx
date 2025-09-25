import InputGrabber from "./InputGrabber"

export default function ImageGrabber({ src, name }: ImageGrabberProps) {
  return (
    <InputGrabber
      name={name}
      accept="image/*"
      img={<img className="h-6" src={src.value} />}
      onFile={async (file) => {
        const newSrc = await imgToSrc(file)
        src.value = newSrc
      }}
    />
  )
}

function imgToSrc(image: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(String(reader.result))
    }

    reader.readAsDataURL(image)
  })
}
