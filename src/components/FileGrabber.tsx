export default function FileGrabber({ label, name, accept, img, onFile }: FileGrabberProps) {
  return (
    <div className="w-full h-6 flex">
      {label}:
      <label htmlFor={name} className="w-full ml-3 border border-zinc-700 cursor-pointer">
        {img}
      </label>
      <input
        type="file"
        className="hidden"
        id={name}
        accept={accept}
        onChange={({ target }) => {
          if (target.files) onFile(target.files[0]);
        }}
      />
    </div>
  );
}
