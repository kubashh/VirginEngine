import FileGrabber from "./FileGrabber";

export default function ImageGrabber({ src, name }: ImageGrabberProps) {
  return (
    <FileGrabber
      label="Image"
      name={name}
      accept="image/*"
      img={<img className="h-6" src={src.value} />}
      onFile={async (file) => (src.value = await imgToSrc(file))}
    />
  );
}

function imgToSrc(image: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result));
    };

    reader.readAsDataURL(image);
  });
}
