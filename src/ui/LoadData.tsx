import { useState } from "react";
import { emptyProject } from "../lib/assets/assets";
import { virginEngineVersion } from "../lib/core";
import { idbGetItem, idbGetKeys, idbRemoveItem, idbSetItem } from "../lib/idb";
import { createSignal, type Signal } from "../lib/framework";
import { config, files, project, type TProject } from "../lib/consts";
import { downloadFile } from "../lib/util";
import { setHierarchy } from "../hierarchy/Hierarchy";
import { refreshFiles } from "../files/Files";
import { addNotification } from "./Notifications";
import { setPopupMenu } from "./PopupMenu";
import { setNameInput } from "./NameInput";
import { setContextMenu } from "./ContextMenu";

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

    this.setUp();
  }

  async setUp() {
    const projectBuf = await idbGetItem<string>(this.name);
    if (!projectBuf) {
      // await localforage.removeItem(this.name);
      // throw new Error(`No such project '${this.name}'`);
      return;
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

    const projectBuf = await idbGetItem<string>(this.name);
    if (projectBuf) {
      const data: TProject | null = JSON.parse(projectBuf);
      if (data && data.config) data.config.gameName = newName;

      await idbSetItem(newName, JSON.stringify(data));

      projectsSignal.set((prev) => [...prev]);
      await idbRemoveItem(this.name);
      this.name = newName;
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
                cb: async (projectName) => {
                  const now = Date.now();
                  const project = emptyProject();
                  project.config.gameName = projectName;
                  openProject(project);
                  projectsSignal.set((prev) => [
                    ...prev,
                    new LDProject({
                      name: config.gameName,
                      modifiedDate: now,
                      editorVersion: virginEngineVersion,
                    }),
                  ]);
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
  const [name, setName] = useState(project.name);
  return (
    <div
      className="mb-2 px-3 sm:px-5 py-1.5 sm:py-2.5 text-base rounded-xl flex justify-between bg-black hover:bg-zinc-800 cursor-pointer"
      onClick={async () => {
        const data = await idbGetItem<string>(name);
        if (data) openProject(JSON.parse(data));
      }}
      onContextMenu={(e) =>
        setContextMenu({
          x: e.clientX,
          y: e.clientY,
          Rename: () =>
            setNameInput({
              cb: (newName) => {
                project.rename(newName);
                setName(newName);
              },
              value: name,
            }),
        })
      }
    >
      <div className="w-32 sm:w-52 border-none">{name}</div>
      <div className="w-30">
        <ModifiedDate modifiedDateSignal={project.modifiedDateSignal} />
      </div>
      <button
        className="hover:text-emerald-800"
        onClick={(e) => {
          e.stopPropagation();

          setPopupMenu({
            label: `Delete ${name}?`,
            options: {
              Yes: () => {
                idbRemoveItem(name).then(() => {
                  addNotification(`Successfully deleted '${name}'.`);
                  projectsSignal.set((prev) => prev.filter((p) => p.name !== name));
                });
              },
            },
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}

function ModifiedDate({ modifiedDateSignal }: { modifiedDateSignal: Signal<string> }) {
  const modifiedDate = modifiedDateSignal.use();
  return modifiedDate;
}

function LoadDataButton({ label, onClick }: { label: string; onClick: React.MouseEventHandler }) {
  return (
    <button
      className="my-auto border-0 border-zinc-600 px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm float-right font-semibold rounded-xl bg-emerald-800 hover:bg-emerald-900"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

async function getSetProjects() {
  const keys = await idbGetKeys();

  const projects: LDProject[] = keys.map(
    (key) =>
      new LDProject({
        name: key,
        modifiedDate: 0,
        editorVersion: ``,
      }),
  );

  projectsSignal.set(projects);
}

function timeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;

  if (diff < MINUTE) return timeAgoHealper(`second`, Math.floor(diff / SECOND));
  if (diff < HOUR) return timeAgoHealper(`minute`, Math.floor(diff / MINUTE));
  if (diff < DAY) return timeAgoHealper(`hour`, Math.floor(diff / HOUR));
  if (diff < MONTH) return timeAgoHealper(`day`, Math.floor(diff / DAY));
  if (diff < YEAR) return timeAgoHealper(`month`, Math.floor(diff / MONTH));
  return timeAgoHealper(`year`, Math.floor(diff / YEAR));
}

function timeAgoHealper(label: string, time: number): string {
  if (time <= 1) return `a ${label} ago`;
  return `${time} ${label}s ago`;
}

function sortByDate() {
  projectsSignal.set((projects) => projects.toSorted((a, b) => b.modifiedDate - a.modifiedDate)); // create new array to trigger update
}

// load file
function loadProjectFromDisk(): Promise<TProject | null> {
  const { promise, resolve } = Promise.withResolvers<TProject | null>();
  const element = document.createElement(`input`);
  element.type = `file`;
  element.accept = `.virginengine`;
  Object.assign(element, {
    onchange: ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();

      reader.onload = ({ target }) => {
        if (!target) return resolve(null);
        const data = JSON.parse(target.result as string);

        resolve(data);
      };

      if (target.files) reader.readAsText(target.files[0]);
    },
  });
  element.click();

  return promise;
}

async function openProject(data: TProject): Promise<void> {
  if (data.metadata.editorVersion != virginEngineVersion) {
    setPopupMenu({
      label: `Change project version from ${data.metadata.editorVersion} to ${virginEngineVersion}?`,
      description: `This project use different editor version. Changing project version may break project`,
      options: {
        Yes: () => {
          data.metadata.editorVersion = virginEngineVersion;
          openProject(data);
        },
      },
    });
    return;
  }
  for (const key in files) delete files[key];
  Object.assign(files, data.files);
  // for (const key in data.files) files[key] = data.files[key];
  // @ts-ignore don't get legacy bad configuration, get only current config shape
  for (const key in config) if (data.config[key]) config[key] = data.config[key];

  refreshFiles(); // trigger refresh to reload assets

  await saveProject();

  openMainScene();
  document.title = `${data.config.gameName} - VirginEngine`;
}

function openMainScene() {
  setSetUp(true);

  const scene =
    files.Scenes[config.startingSceneName] ||
    Object.values(files.Scenes).find((s) => typeof s !== `string`);

  setHierarchy(scene);
}

// save indexedDB
export function saveProject(): Promise<void> {
  return idbSetItem(config.gameName, getProjectJsonString());
}

// save to file
export function saveProjectFile() {
  downloadFile(`${config.gameName}.virginengine`, getProjectJsonString());
  addNotification(`Downloading project '${config.gameName}'...`);
}

function getProjectJsonString(): string {
  project.metadata.modifiedDate = Date.now();
  return JSON.stringify(project);
}

window.addEventListener(`keydown`, (e) => {
  if (e.ctrlKey && e.key === `s`) {
    e.preventDefault();
    if (config.gameName !== ``) saveProject();
  }
});
