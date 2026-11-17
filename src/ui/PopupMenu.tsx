import { useEffect } from "react";
import { createSignal } from "../lib/signal";

const popupMenuSignal = createSignal<TPopupMenu>({ label: `` });

export function setPopupMenu(props: TPopupMenu) {
  popupMenuSignal.set(props);
}

export function PopupMenu() {
  const popupMenu = popupMenuSignal.use();

  useEffect(() => {
    if (!popupMenu.label) return;
    document.addEventListener(`mousedown`, onMouseDown);

    return () => {
      document.removeEventListener(`mousedown`, onMouseDown);
    };
  }, [popupMenu]);

  return popupMenu.label ? (
    <div className="flex h-screen w-screen justify-center bg-[#000b] px-4">
      <div id="popup-menu" className="mt-[24vh] mb-auto flex flex-col p-2 *:mx-auto">
        <div className="mb-4 text-center text-xl sm:text-2xl">{popupMenu.label}</div>
        <div
          style={{ display: !popupMenu.description ? `none` : `` }}
          className="mb-4 text-center text-base"
        >
          {popupMenu.description}
        </div>
        <PopupMenuOptions options={popupMenu.options} />
      </div>
    </div>
  ) : null;
}

function PopupMenuOptions({ options }: { options?: TObj<() => void> }) {
  return options
    ? Object.entries(options).map(([label, cb]) => (
        <button
          key={label}
          className="rounded-2xl border border-zinc-400 bg-[#000a] px-3 py-1.5 text-lg hover:text-zinc-400"
          onClick={() => {
            cb();
            setPopupMenu({ label: ``, options: {} });
          }}
        >
          {label}
        </button>
      ))
    : null;
}

function onMouseDown({ target }: MouseEvent) {
  const element = document.getElementById(`popup-menu`);
  if (element && !element.contains(target as Node)) {
    setPopupMenu({ label: ``, options: {} });
  }
}

type TPopupMenu = {
  label: string;
  description?: string;
  options?: TObj<() => void>;
};
