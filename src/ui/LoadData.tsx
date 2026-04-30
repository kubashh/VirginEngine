import { useEffect } from "react";
import localforage from "localforage";
import { createSignal } from "wdwh";
import Button from "../components/Button";
import { popupMenuSignal, setUpSignal } from "../lib/consts";
import { loadProject, openMainScene } from "../lib/util";

const projectsSignal = createSignal<TLDProject[]>([]);

// It is called once (~90%), so no extra optymalization needed
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
    getProjects().then((projects) => projectsSignal.set(projects));
  }, []);

  return <>{...projects.map((project) => <Project {...project} />)}</>;
}

function Project({ name, modifiedDate }: TLDProject) {
  return (
    <div className="w-[80%] mx-auto my-3 border-2 border-zinc-400 shadow-5xl px-16 py-4 text-xl rounded-xl flex justify-between gap-32 bg-zinc-900">
      {/* nth-1:w-[]"> */}
      <input type="text" defaultValue={name} className="border-none" />
      <div>{timeAgo(modifiedDate)}</div>
      <Button
        label="Load"
        className="hover:text-zinc-400 cursor-pointer"
        onClick={async () => {
          const data: string | null = await localforage.getItem(name);
          if (data) {
            loadProject(JSON.parse(data));
          }
        }}
      />
      <Button
        label="Delete"
        className="hover:text-zinc-400 cursor-pointer"
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

function LoadDataButton(props: { label: string; onClick: React.MouseEventHandler }) {
  return (
    <Button className="mt-6 border-4 border-zinc-400 px-8 py-3 text-3xl hover:text-zinc-400" {...props} />
  );
}

async function getProjects(): Promise<TLDProject[]> {
  const keys = await localforage.keys();
  const modifiedDates = await Promise.all<any>(
    keys.map((key) => {
      return localforage
        .getItem<string>(key)
        .then((projectString) => JSON.parse(projectString!).modifiedDate);
    }),
  );

  return keys.map((key, i) => ({
    name: key,
    modifiedDate: modifiedDates[i],
  }));
}

function timeAgo(timestamp: number) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} seconds ago`;
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
}

type TLDProject = {
  name: string;
  modifiedDate: number;
};
