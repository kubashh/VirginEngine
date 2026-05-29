import Window from "../components/Window";
import File from "./File";
import { files, refreshFiles } from "../lib/consts";
import { useRefresh } from "wdwh/hooks";

export default function Files() {
  return (
    <Window name="Files" className="w-(--w2) h-(--h2)">
      <div className="scrollbar-y">
        <FilesComponent />
      </div>
    </Window>
  );
}

function FilesComponent() {
  refreshFiles.refresh = useRefresh();

  return <File file={files} name="files" deep={0} parent />;
}
