export default function ImageGrabber({ src, id }: ImageGrabberProps) {
  return (
    <div className="flex">
      <label htmlFor={String(id)} className="mr-2 border-1 border-zinc-700 cursor-pointer">
        <img width="40" height="40" src={src.value} alt="obraz" />
      </label>
      <input
        type="file"
        id={String(id)}
        className="hidden"
        onChange={({ target }) => {
          if (!target.files) return
          configureImage(target.files[0], src)
        }}
      />
    </div>
  )
}

const MAX_CHARS = 98000
const IMAGE_SIZE = 400

document.addEventListener(`change`, (e) => {
  console.log(e)
})

function configureImage(image: File, src: { value: string }) {
  imgToSrc(image, (newSrc) => {
    resizeScrImage(newSrc, (newSrc) => {
      console.log(`Before: ${newSrc.length}`)
      optymalizeSrc(newSrc, (newSrc) => {
        console.log(`After: ${newSrc.length}`)
        src.value = newSrc
      })
    })
  })
}

function imgToSrc(image: File, callback: ImageGrabberCbType) {
  const reader = new FileReader()

  reader.onload = () => {
    const src = String(reader.result)
    callback(src)
  }

  reader.readAsDataURL(image)
}

function resizeScrImage(src: string, callback: ImageGrabberCbType) {
  const canvas = document.createElement(`canvas`)
  canvas.width = IMAGE_SIZE
  canvas.height = IMAGE_SIZE
  const ctx = canvas.getContext(`2d`)
  if (!ctx) return alert(`No ctx`)

  const image = new Image()

  image.onload = () => {
    let width = image.width
    let height = image.height

    const aspectRatio = width / height

    let newWidth = IMAGE_SIZE
    let newHeight = IMAGE_SIZE

    if (width > height) {
      newWidth *= aspectRatio
    } else {
      newHeight *= aspectRatio
    }

    let [x, y] = [0, 0]

    if (width > height) {
      x = (IMAGE_SIZE - newWidth) / 2
    } else {
      y = (IMAGE_SIZE - newHeight) / 2
    }

    console.log(x, y)

    ctx.drawImage(image, 0, 0, width, height, x, y, newWidth, newHeight)
    const newSrc = canvas.toDataURL()

    callback(newSrc)
  }

  image.src = src
}

function optymalizeSrc(src: string, callback: ImageGrabberCbType) {
  if (src.length < MAX_CHARS) return callback(src)

  const imageElement = new Image()

  imageElement.onload = () => optymalizeImage(imageElement, callback)

  imageElement.src = src
}

function optymalizeImage(imageElement: HTMLImageElement, callback: ImageGrabberCbType) {
  const canvas = document.createElement(`canvas`)
  canvas.width = imageElement.width
  canvas.height = imageElement.height

  const ctx = canvas.getContext(`2d`)
  if (!ctx) return alert(`No ctx`)
  ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height)

  for (let i = 0.96; i > 0; i -= 0.02) {
    const newSrc = canvas.toDataURL(`image/jpeg`, i)

    if (newSrc.length < MAX_CHARS) {
      return callback(newSrc)
    }
  }
}
