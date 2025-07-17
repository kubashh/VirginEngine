import { files } from "./values/values"
import { clone, loadScene } from "./functions/basicFunctions"
import { run } from "./functions/runUpdateRender"

console.log(files, clone)
loadScene(`REPLACE_PATH_TO_MAIN_SCENE`)
run()
// document.body.children[1].remove()`
