import { File } from "./File"

export const Files = () => {
  return <div
    style={{
      overflow: "scroll"
    }}
  >
    <File
      file={window.data.files}
      main={true}
    />
  </div>
}