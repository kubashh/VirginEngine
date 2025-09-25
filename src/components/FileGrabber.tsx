export default function FileGrabber({ name, accept, img, onFile }: FileGrabberProps) {
  return (
    <div className="w-full ml-3 flex">
      <label htmlFor={name} className="w-full h-6 mr-2 border-1 border-zinc-700 cursor-pointer">
        {img}
      </label>
      <input
        type="file"
        className="hidden"
        id={name}
        accept={accept}
        onChange={({ target }) => {
          if (target.files) onFile(target.files[0])
        }}
      />
    </div>
  )
}
