import { files } from "../lib/consts";
import { useRefresh } from "../lib/hooks";
import { Window } from "../lib/components/Window";
import { File } from "./File";

const refreshFilesRef = { refresh() {} };

export function refreshFiles() {
  refreshFilesRef.refresh();
}

export function Files() {
  return (
    <Window name="Files" className="w-(--w2) h-(--h2)">
      <div className="scrollbar-y">
        <FilesComponent />
      </div>
    </Window>
  );
}

function FilesComponent() {
  refreshFilesRef.refresh = useRefresh();

  return <File file={files} name="files" deep={0} parent={{ type: `folder` }} />;
}
