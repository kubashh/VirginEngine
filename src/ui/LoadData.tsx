import localforage from "localforage";
import { createSignal, type Signal } from "wdwh";
import { Button, TextInput } from "wdwh/components";
import { config, nameInputSignal, popupMenuSignal, setUpSignal } from "../lib/consts";
import { loadProject, openMainScene, saveProject } from "../lib/util";

const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

const projectsSignal = createSignal<TLDProject[]>([]);
setUpSignal.subscribe(() => {
  if (!setUpSignal.get()) getSetProjects();
  else {
    for (const project of projectsSignal.get()) {
      if (project.timeoutId) clearTimeout(project.timeoutId);
    }
  }

  const loadDataElement = document.getElementById(`load-data`);
  if (loadDataElement) loadDataElement.style.display = !setUpSignal.get() ? `` : `none`;
});
getSetProjects();

export default function LoadData() {
  return (
    <section
      id="load-data"
      className="w-screen h-screen px-4 sm:px-20 pt-4 flex flex-col bg-[#000c] scrollbar-y"
    >
      <div className="mb-4 flex gap-x-3">
        <div className="mr-auto text-3xl font-semibold">Projects</div>
        <div className="flex *:first:mr-4">
          <LoadDataButton label="Add project from disk" onClick={loadProject} />
          <LoadDataButton
            label="New project"
            onClick={() => {
              nameInputSignal.set({
                cb: (projectName) => {
                  config.gameName = projectName;
                  saveProject();
                  openMainScene();
                },
              });
            }}
          />
        </div>
      </div>
      <Projects />
    </section>
  );
}

function Projects() {
  const projects = projectsSignal.use();
  return <>{...projects.map((project) => <Project key={project.name} {...project} />)}</>;
}

function Project({ name, modifiedDateSignal }: TLDProject) {
  return (
    <div
      className="mb-5 px-3 sm:px-6 py-2 sm:py-3 text-base lg:text-lg rounded-xl flex justify-between bg-black hover:bg-zinc-800 cursor-pointer"
      onClick={async () => {
        const data = await localforage.getItem<string>(name);
        loadProject(JSON.parse(data || ``));
      }}
    >
      <TextInput
        defaultValue={name}
        allow={/^[a-zA-Z0-9\s:.'!?&_-]+$/}
        className="w-20 sm:w-40 lg:w-52 border-none"
        onChange={async (newName) => {
          const data = await localforage.getItem(name);
          await localforage.removeItem(name);
          await localforage.setItem(newName, data);
          projectsSignal.set((prev) => prev.map((p) => (p.name === name ? { ...p, name: newName } : p)));
        }}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="w-26 lg:w-34">
        <ModifiedDate modifiedDateSignal={modifiedDateSignal} />
      </div>
      <Button
        label="Delete"
        className="hover:text-emerald-800"
        onClick={(e) => {
          e.stopPropagation();

          popupMenuSignal.set({
            label: `Delete project "${name}"?`,
            options: {
              Yes: () => {
                localforage.removeItem(name); // It will never fails so don't need await
                projectsSignal.set((prev) => prev.filter((p) => p.name !== name)); // Optymisticly update projects list
              },
            },
          });
        }}
      />
    </div>
  );
}

function ModifiedDate({ modifiedDateSignal }: { modifiedDateSignal: Signal<string> }) {
  const modifiedDate = modifiedDateSignal.use();
  return modifiedDate;
}

function LoadDataButton(props: { label: string; onClick: React.MouseEventHandler }) {
  return (
    <Button
      className="my-auto border-0 border-zinc-600 px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm float-right font-semibold rounded-xl bg-emerald-800 hover:bg-emerald-900"
      {...props}
    />
  );
}

async function getSetProjects() {
  const keys = await localforage.keys();

  const projects = keys.map((key) => ({
    name: key,
    modifiedDate: 0,
    modifiedDateSignal: createSignal(``),
    timeoutId: 0,
  }));

  projectsSignal.set(projects);

  function timeout(project: TLDProject, ms: number) {
    project.timeoutId = setTimeout(() => {
      const diff = Date.now() - project.modifiedDate;
      const time = diff < MINUTE ? SECOND : diff < HOUR ? MINUTE : Infinity;

      if (time !== Infinity) timeout(project, time);
      project.modifiedDateSignal.set(timeAgo(project.modifiedDate));
    }, ms);
  }

  projects.forEach(async (project) => {
    const projectBuf = await localforage.getItem<string>(project.name);
    if (!projectBuf) throw new Error(`No such project "${project.name}"`);
    project.modifiedDate = JSON.parse(projectBuf).modifiedDate;
    sortByData();
    timeout(project, 0);
  });
}

function timeAgo(timestamp: number) {
  const diff = Date.now() - timestamp;

  if (diff < MINUTE) return timeAgoHealper(`second`, Math.floor(diff / SECOND));
  if (diff < HOUR) return timeAgoHealper(`minute`, Math.floor(diff / MINUTE));
  if (diff < DAY) return timeAgoHealper(`hour`, Math.floor(diff / HOUR));
  if (diff < MONTH) return timeAgoHealper(`day`, Math.floor(diff / DAY));
  if (diff < YEAR) return timeAgoHealper(`month`, Math.floor(diff / MONTH));
  return timeAgoHealper(`year`, Math.floor(diff / YEAR));
}

function timeAgoHealper(label: string, time: number) {
  if (time === 1) return `a ${label} ago`;
  return `${time} ${label}s ago`;
}

function sortByData() {
  projectsSignal.set((projects) => projects.toSorted((a, b) => b.modifiedDate - a.modifiedDate)); // create new array to trigger update
}

type TLDProject = {
  name: string;
  modifiedDate: number;
  modifiedDateSignal: Signal<string>;
  timeoutId: number;
};
