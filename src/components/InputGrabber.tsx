export default function InputGrabber({ name, accept, img, onFile }: InputGrabberProps) {
  return (
    <div className="flex">
      <label htmlFor={name} className="mr-2 border-1 border-zinc-700 cursor-pointer">
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
