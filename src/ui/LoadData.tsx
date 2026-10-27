import localforage from "localforage";
import { virginEngineVersion } from "../lib/core";
import { Button, TextInput } from "../components/components";
import { createSignal, type Signal } from "../lib/framework";
import { emptyProject } from "../lib/assets/assets";
import { config, project, type TProject } from "../lib/consts";
import { deepCopy, loadProjectFromDisk, openMainScene, openProject, saveProject } from "../lib/util";
import { addNotification } from "./Notifications";
import { setPopupMenu } from "./PopupMenu";
import { setNameInput } from "./NameInput";

const SECOND = 1000;
const MINUTE = 60 * 1000;
const HOUR = 60 * 60 * 1000;
const DAY = 24 * 60 * 60 * 1000;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

class LDProject {
  name: string;
  modifiedDate: number;
  modifiedDateSignal: Signal<string>;
  editorVersion: string;
  timeoutId: NodeJS.Timeout | null;

  constructor(props: { name: string; modifiedDate?: number; editorVersion?: string }) {
    if (!projectsSignal.get().find((p) => p.name === props.name)) {
      projectsSignal.set((prev) => [...prev, this]);
    }

    this.name = props.name;
    this.modifiedDate = props.modifiedDate || 0;
    this.modifiedDateSignal = createSignal(this.modifiedDate ? timeAgo(this.modifiedDate) : ``);
    this.editorVersion = props.editorVersion || ``;
    this.timeoutId = null;
  }

  async setUp() {
    const projectBuf = await localforage.getItem<string>(this.name);
    if (!projectBuf) {
      await localforage.removeItem(this.name);
      throw new Error(`No such project '${this.name}'`);
    }
    const realProject: TProject = JSON.parse(projectBuf);
    this.modifiedDate = realProject.metadata.modifiedDate;
    this.editorVersion = realProject.metadata.editorVersion;
    sortByDate();
    this.timeout(0);
  }

  async rename(newName: string) {
    if (this.name === newName) return;
    for (const project of projectsSignal.get()) {
      if (project.name === newName) return;
    }

    const projectBuf = await localforage.getItem<string>(this.name);
    if (projectBuf) {
      const data: TProject | null = JSON.parse(projectBuf);
      if (data && data.config) data.config.gameName = newName;

      await localforage.setItem(newName, JSON.stringify(data));

      projectsSignal.set((prev) => [...prev]);
      await localforage.removeItem(this.name);
      this.name = newName;

      console.log(await localforage.keys());
    }
  }

  timeout(ms: number) {
    this.timeoutId = setTimeout(() => {
      const diff = Date.now() - this.modifiedDate;
      const time = diff < MINUTE ? SECOND : diff < HOUR ? MINUTE : Infinity;

      if (time !== Infinity) this.timeout(time);
      this.modifiedDateSignal.set(timeAgo(this.modifiedDate));
    }, ms);
  }
}

const projectsSignal = createSignal<LDProject[]>([]);

export function setSetUp(setUp: boolean) {
  if (!setUp) {
    document.title = `VirgineEngine v${virginEngineVersion}`;
    getSetProjects();
  } else {
    for (const project of projectsSignal.get()) {
      if (project.timeoutId) clearTimeout(project.timeoutId);
    }
  }

  const loadDataElement = document.getElementById(`load-data`);
  if (loadDataElement) loadDataElement.style.display = !setUp ? `` : `none`;
}
getSetProjects();

export function LoadData() {
  return (
    <section
      id="load-data"
      className="w-screen h-screen px-4 sm:px-20 pt-4 flex flex-col bg-[#000c] scrollbar-y"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="mb-4 flex gap-x-3">
        <div className="mr-auto text-2xl font-semibold">Projects</div>
        <div className="flex *:first:mr-4">
          <LoadDataButton
            label="Add project from disk"
            onClick={() => {
              loadProjectFromDisk().then((project) => project && openProject(project));
            }}
          />
          <LoadDataButton
            label="New project"
            onClick={() => {
              setNameInput({
                cb: (projectName) => {
                  const now = Date.now();
                  const { config: emptyConfig, files } = emptyProject();
                  emptyConfig.gameName = projectName;
                  Object.assign(project.config, deepCopy(emptyConfig));
                  Object.assign(project.files, deepCopy(files));
                  Object.assign(project.metadata, {
                    modifiedDate: now,
                    editorVersion: virginEngineVersion,
                  });
                  config.gameName = projectName;
                  projectsSignal.set((prev) => [
                    ...prev,
                    new LDProject({
                      name: config.gameName,
                      modifiedDate: now,
                      editorVersion: virginEngineVersion,
                    }),
                  ]);
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

async function onDrop(e: React.DragEvent<HTMLElement>) {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (!file.name.endsWith(`.virginengine`)) {
    alert(`VirginEngine project file must ends with '.virginengine'!`);
    return;
  }
  const text = await file.text();
  const project: TProject = JSON.parse(text);
  if (projectsSignal.get().find((p) => p.name === project.config.gameName)) {
    setPopupMenu({
      label: `Do you want to replace existing project named '${project.config.gameName}'`,
      options: {
        Yes: () => {
          openProject(project);
        },
      },
    });
  } else {
    openProject(project);
  }
}

function Projects() {
  const projects = projectsSignal.use();
  return <>{...projects.map((project) => <Project key={project.name} project={project} />)}</>;
}

function Project({ project }: { project: LDProject }) {
  const name = project.name;
  return (
    <div
      className="mb-2 px-3 sm:px-6 py-2 sm:py-3 text-base lg:text-lg rounded-xl flex justify-between bg-black hover:bg-zinc-800 cursor-pointer"
      onClick={async () => {
        const data = await localforage.getItem<string>(name);
        if (data) openProject(JSON.parse(data));
      }}
    >
      <TextInput
        defaultValue={name}
        allow={/^[a-zA-Z0-9\s:.'!?&_-]+$/}
        className="w-20 sm:w-40 lg:w-52 border-none"
        onChange={async (newName) => await project.rename(newName)}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="w-26 lg:w-34">
        <ModifiedDate modifiedDateSignal={project.modifiedDateSignal} />
      </div>
      <Button
        label="Delete"
        className="hover:text-emerald-800"
        onClick={(e) => {
          e.stopPropagation();

          setPopupMenu({
            label: `Delete ${name}?`,
            options: {
              Yes: () => {
                localforage.removeItem(name).then(() => {
                  addNotification(`Successfully deleted '${name}'.`);
                  projectsSignal.set((prev) => prev.filter((p) => p.name !== name));
                });
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

  const projects: LDProject[] = keys.map(
    (key) =>
      new LDProject({
        name: key,
        modifiedDate: 0,
        editorVersion: ``,
      }),
  );

  projects.forEach(async (project) => await project.setUp());
  projectsSignal.set(projects);
  sortByDate();
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
  if (time <= 1) return `a ${label} ago`;
  return `${time} ${label}s ago`;
}

function sortByDate() {
  projectsSignal.set((projects) => projects.toSorted((a, b) => b.modifiedDate - a.modifiedDate)); // create new array to trigger update
}

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s` && config.gameName !== ``) {
    e.preventDefault();
  }
});
