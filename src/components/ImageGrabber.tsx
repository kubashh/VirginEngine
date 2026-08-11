import { type Signal } from "wdwh";
import FileGrabber from "./FileGrabber";

export default function ImageGrabber({ srcSignal, name }: ImageGrabberProps) {
  return (
    <FileGrabber
      label="Image"
      name={name}
      accept="image/*"
      img={<img className="h-6" src={srcSignal.use()} />}
      onFile={async (file) => srcSignal.set(await imgToSrc(file))}
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

export type ImageGrabberProps = {
  srcSignal: Signal<string>;
  name: string;
};
