import { useEffect } from "react";
import { createSignal } from "../lib/framework";
import { Button } from "../components/components";

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
    <div className="w-screen h-screen px-4 flex justify-center bg-[#000b]">
      <div id="popup-menu" className="flex flex-col *:mx-auto mt-[24vh] mb-auto p-2">
        <div className="mb-4 text-xl sm:text-2xl text-center">{popupMenu.label}</div>
        <div
          style={{ display: !popupMenu.description ? `none` : `` }}
          className="mb-4 text-base text-center"
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
        <Button
          label={label}
          key={label}
          className="border border-zinc-400 px-3 py-1.5 text-lg rounded-2xl bg-[#000a] hover:text-zinc-400"
          onClick={() => {
            cb();
            setPopupMenu({ label: ``, options: {} });
          }}
        />
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
