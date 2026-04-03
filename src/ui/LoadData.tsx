import { useEffect } from "react";
import localforage from "localforage";
import { createSignal } from "wdwh";
import { setUpSignal } from "../lib/consts";
import { loadProject, openMainScene } from "../lib/util";

const projectsSignal = createSignal<string[]>([]);

// It is called once, so no extra optymalization needed
export default function LoadData() {
  const setUp = setUpSignal.use();

  return !setUp ? (
    <div className="absolute z-1 w-screen h-screen flex flex-col justify-center bg-[#000a]">
      <br className="mt-32" />
      <Projects />
      <LoadDataButton value="Load Project" onClick={loadProject} />
      <LoadDataButton value="New project" onClick={openMainScene} />
    </div>
  ) : null;
}

function Projects() {
  const names = projectsSignal.use();

  useEffect(() => {
    localforage.keys().then((keys) => projectsSignal.set(keys));
  }, []);

  return (
    <>
      <LoadDataRow>
        <div>Name</div>
        <div>Load</div>
        <div>Delete</div>
      </LoadDataRow>
      {...names.map((name) => <Project name={name} />)}
    </>
  );
}

function Project({ name }: { name: string }) {
  return (
    <LoadDataRow>
      <input type="text" defaultValue={name} className="border-none" />
      <div className="hover:text-zinc-400 cursor-pointer">Load</div>
      <div className="hover:text-zinc-400 cursor-pointer">Delete</div>
    </LoadDataRow>
  );
}

function LoadDataRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[80%] mx-auto my-6 border-zinc-400 px-16 py-4 text-xl rounded-xl flex justify-between gap-32 bg-zinc-900">
      {/* nth-1:w-[]"> */}
      {children}
    </div>
  );
}

function LoadDataButton(props: { value: string; onClick: React.MouseEventHandler }) {
  return (
    <input
      className="mx-auto my-6 border-4 border-zinc-400 px-16 py-4 text-5xl hover:text-zinc-400 cursor-pointer"
      type="button"
      {...props}
    />
  );
}
