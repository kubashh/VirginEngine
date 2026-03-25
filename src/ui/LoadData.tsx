import localforage from "localforage";
import { setUpSignal } from "../lib/consts";
import { loadProject, openMainScene } from "../lib/util";
// import { createSignal } from "wdwh";

// const projectsSignal = createSignal<string[]>([]);

// It is called once, so no extra optymalization needed
export default function LoadData() {
  const setUp = setUpSignal.use();

  (async () => {
    console.log(await localforage.keys());
  })();

  return !setUp ? (
    <div className="absolute z-1 w-screen h-screen flex flex-col justify-center bg-[#000a]">
      {/* <Projects /> */}
      <LoadDataButton value="Load Project" onClick={loadProject} />
      <LoadDataButton value="New project" onClick={openMainScene} />
    </div>
  ) : null;
}

// function Projects() {
//   const names = projectsSignal.use();

//   localforage.keys().then((keys) => projectsSignal.set(keys));

//   return (
//     <>
//       <div className="mx-auto my-6 border-zinc-400 px-16 py-4 text-xl rounded-xl grid grid-cols-3 gap-32 bg-zinc-900">
//         <div>Name</div>
//         <div>Load</div>
//         <div>Delete</div>
//       </div>
//       {...names.map((name) => <Project name={name} />)}
//     </>
//   );
// }

// function Project({ name }: { name: string }) {
//   return (
//     <div className="mx-auto my-6 border-zinc-400 px-16 py-4 text-xl rounded-xl grid grid-cols-3 gap-32 bg-zinc-900">
//       <input type="text" defaultValue={name} className="border-none" />
//       <div className="hover:text-zinc-400 cursor-pointer">Load</div>
//       <div className="hover:text-zinc-400 cursor-pointer">Delete</div>
//     </div>
//   );
// }

function LoadDataButton(props: { value: string; onClick: React.MouseEventHandler }) {
  return (
    <input
      className="mx-auto my-6 border-4 border-zinc-400 px-16 py-4 text-5xl hover:text-zinc-400 cursor-pointer"
      type="button"
      {...props}
    />
  );
}
