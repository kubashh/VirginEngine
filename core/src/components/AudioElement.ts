import { file } from "@/util/basicFunctions"

export default class AudioElement extends Audio implements TAudio {
  static canPlay = false

  constructor({ path }: AudioProps) {
    super(file(path))
    console.log(this.src)
  }

  override play(): any {
    if (!AudioElement.canPlay) return

    super.currentTime = 0
    super.play()
  }
}
