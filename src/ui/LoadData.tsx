import localforage from "localforage";
import { useEffect } from "react";
import { createSignal } from "wdwh";
import Button from "../components/Button";
import { popupMenuSignal, setUpSignal } from "../lib/consts";
import { loadProject, openMainScene } from "../lib/util";

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
    <section className="w-screen h-screen flex flex-col bg-[#000a] overflow-x-scroll">
      <div className="mt-16 mb-12 text-5xl font-semibold self-center">Load Project</div>
      <Projects />
      <div className="mx-auto mb-12 flex gap-32 justify-between">
        <LoadDataButton label="Load project from local files" onClick={loadProject} />
        <LoadDataButton label="New project" onClick={openMainScene} />
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

  return <>{...projects.map((project) => <Project {...project} />)}</>;
}

function Project({ name, modifiedDateSignal }: TLDProject) {
  return (
    <div className="w-[80%] mx-auto my-3 border-2 border-zinc-400 shadow-5xl px-16 py-4 text-xl rounded-xl flex justify-between gap-32 font-semibold *:drop-shadow-[0_0_14px_rgba(236,72,153,1)]">
      {/* nth-1:w-[]"> */}
      <input type="text" defaultValue={name} className="border-none" />
      <div className="w-40">
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
        onClick={() =>
          popupMenuSignal.set({
            label: `Would you delete project "${name}"?`,
            options: {
              Yes: () => {
                localforage.removeItem(name);
                projectsSignal.set((prev) => prev.filter((p) => p.name !== name)); // Optymisticly update projects
              },
            },
          })
        }
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
      className="mt-6 border-2 border-zinc-400 px-12 py-4 text-2xl rounded-xl hover:text-zinc-400"
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
      timeout(project, getTimeoutEnd(project.modifiedDate));
      project.modifiedDateSignal.set(timeAgo(project.modifiedDate));
    }, ms);
  }

  projects.forEach(async (project) => {
    const projectBuf = await localforage.getItem<string>(project.name);
    project.modifiedDate = JSON.parse(projectBuf!).modifiedDate;
    timeout(project, 0);
  });
}

function getTimeoutEnd(ms: number) {
  const diff = Date.now() - ms;
  if (diff < MINUTE) return SECOND;
  if (diff < HOUR) return MINUTE;
  return HOUR; // it is enought
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
  if (time === 1) return `${time} ${label} ago`;
  return `${time} ${label}s ago`;
}

type TLDProject = {
  name: string;
  modifiedDate: number;
  modifiedDateSignal: Signal<string>;
  timeoutId: number;
};
