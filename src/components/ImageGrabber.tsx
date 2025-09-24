import InputGrabber from "./InputGrabber"

export default function ImageGrabber({ src, name }: ImageGrabberProps) {
  return (
    <InputGrabber
      name={name}
      accept="image/*"
      img={<img className="max-w-20" src={src.value} />}
      onFile={(file) => {
        configureImage(file, src)
      }}
    />
  )
}

// TODO new Promise
function configureImage(image: File, src: { value: string }) {
  imgToSrc(image, (newSrc) => {
    src.value = newSrc
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

// function resizeScrImage(src: string, callback: ImageGrabberCbType) {
//   const canvas = document.createElement(`canvas`)
//   canvas.width = IMAGE_SIZE
//   canvas.height = IMAGE_SIZE
//   const ctx = canvas.getContext(`2d`)
//   if (!ctx) return alert(`No ctx`)

//   const image = new Image()

//   image.onload = () => {
//     let width = image.width
//     let height = image.height

//     const aspectRatio = width / height

//     let newWidth = IMAGE_SIZE
//     let newHeight = IMAGE_SIZE

//     if (width > height) {
//       newWidth *= aspectRatio
//     } else {
//       newHeight *= aspectRatio
//     }

//     let [x, y] = [0, 0]

//     if (width > height) {
//       x = (IMAGE_SIZE - newWidth) / 2
//     } else {
//       y = (IMAGE_SIZE - newHeight) / 2
//     }

//     console.log(x, y)

//     ctx.drawImage(image, 0, 0, width, height, x, y, newWidth, newHeight)
//     const newSrc = canvas.toDataURL()

//     callback(newSrc)
//   }

//   image.src = src
// }

// function optymalizeSrc(src: string, callback: ImageGrabberCbType) {
//   if (src.length < MAX_CHARS) return callback(src)

//   const imageElement = new Image()

//   imageElement.onload = () => optymalizeImage(imageElement, callback)

//   imageElement.src = src
// }

// function optymalizeImage(imageElement: HTMLImageElement, callback: ImageGrabberCbType) {
//   const canvas = document.createElement(`canvas`)
//   canvas.width = imageElement.width
//   canvas.height = imageElement.height

//   const ctx = canvas.getContext(`2d`)
//   if (!ctx) return alert(`No ctx`)
//   ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height)

//   for (let i = 0.96; i > 0; i -= 0.02) {
//     const newSrc = canvas.toDataURL(`image/jpeg`, i)

//     if (newSrc.length < MAX_CHARS) {
//       return callback(newSrc)
//     }
//   }
// }
