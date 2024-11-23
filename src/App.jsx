import { data } from "./data"
import { Editor } from "./routes/Editor"
import { LoadData } from "./routes/LoadData"

export const App = () => {
  return (
    <div>
      {data.init === false ? <LoadData /> : <div />}
      <Editor />
    </div>
  )
}