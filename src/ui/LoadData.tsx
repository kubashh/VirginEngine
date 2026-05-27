import localforage from "localforage";
import { useEffect } from "react";
import { createSignal } from "wdwh";
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

export default function LoadData() {
  const setUp = setUpSignal.use();

  return !setUp ? (
    <section className="w-screen h-screen flex flex-col bg-[#000b] scrollbar-y">
      <div className="mt-16 mb-12 text-5xl font-semibold self-center">Load Project</div>
      <Projects />
      <div className="mx-4 sm:mx-20 xl:mx-32 mb-12 flex justify-between *:first:mr-8 *:bg-[#000a]">
        <LoadDataButton label="Load project from local files" onClick={loadProject} />
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
    </section>
  ) : null;
}

function Projects() {
  const projects = projectsSignal.use();

  useEffect(() => {
    getSetProjects();

    return () => {
      for (const project of projects) {
        if (project.timeoutId) clearTimeout(project.timeoutId);
      }
    };
  }, []);

  return <>{...projects.map((project) => <Project key={project.name} {...project} />)}</>;
}

function Project({ name, modifiedDateSignal }: TLDProject) {
  return (
    <div className="mx-4 sm:mx-20 xl:mx-32 mb-5 border-2 border-zinc-400 shadow-5xl px-3 sm:px-8 py-2 sm:py-4 rounded-xl flex justify-between font-semibold bg-[#000a] *:drop-shadow-[0_0_14px_rgba(236,72,153,1)] text-sm sm:text-base xl:text-xl">
      <TextInput
        defaultValue={name}
        allow={/^[a-zA-Z0-9\s:.'!?&_-]+$/}
        className="w-20 sm:w-40 xl:w-60 border-none"
        onChange={async (newName) => {
          const data = await localforage.getItem(name);
          await localforage.removeItem(name);
          await localforage.setItem(newName, data);
          projectsSignal.set((prev) => prev.map((p) => (p.name === name ? { ...p, name: newName } : p)));
          console.log(name, newName);
        }}
      />
      <div className="w-26 sm:w-30 xl:w-36 flex items-center">
        <ModifiedData modifiedDateSignal={modifiedDateSignal} />
      </div>
      <Button
        label="Load"
        className="hover:text-zinc-400"
        onClick={async () => {
          const data = await localforage.getItem<string>(name);
          loadProject(JSON.parse(data || ``));
        }}
      />
      <Button
        label="Delete"
        className="hover:text-zinc-400"
        onClick={() => {
          popupMenuSignal.set({
            label: `Delete project "${name}"?`,
            options: {
              Yes: () => {
                localforage.removeItem(name); // It will never fails
                projectsSignal.set((prev) => prev.filter((p) => p.name !== name)); // Optymisticly update projects
              },
            },
          });
        }}
      />
    </div>
  );
}

function ModifiedData({ modifiedDateSignal }: { modifiedDateSignal: Signal<string> }) {
  const modifiedDate = modifiedDateSignal.use();
  return modifiedDate;
}

function LoadDataButton(props: { label: string; onClick: React.MouseEventHandler }) {
  return (
    <Button
      className="w-full border-2 border-zinc-400 px-3 sm:px-8 py-2 sm:py-4 text-sm sm:text-base xl:text-xl font-bold rounded-xl hover:text-zinc-400"
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
      let time = HOUR; // it is enought
      if (diff < MINUTE) time = SECOND;
      else if (diff < HOUR) time = MINUTE;

      timeout(project, time);
      project.modifiedDateSignal.set(timeAgo(project.modifiedDate));
    }, ms);
  }

  projects.forEach(async (project) => {
    const projectBuf = await localforage.getItem<string>(project.name);
    project.modifiedDate = JSON.parse(projectBuf!).modifiedDate;
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
  if (time === 1) return `1 ${label} ago`;
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
