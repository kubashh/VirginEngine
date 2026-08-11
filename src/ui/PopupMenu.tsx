import { useEffect } from "react";
import { Button } from "wdwh/components";
import { popupMenuSignal } from "../lib/consts";

export default function PopupMenu() {
  const popupMenu = popupMenuSignal.use();

  useEffect(() => {
    if (!popupMenu.label) return;
    document.addEventListener(`mousedown`, onMouseDown);

    return () => {
      document.removeEventListener(`mousedown`, onMouseDown);
    };
  }, [popupMenu]);

  return popupMenu.label ? (
    <div className="w-screen h-screen flex justify-center bg-[#000b]">
      <div id="popup-menu" className="flex flex-col *:mx-auto mt-[30vh] mb-auto p-2">
        <div className="mb-8 text-xl sm:text-4xl">{popupMenu.label}</div>
        <PopupMenuOptions options={popupMenu.options} />
      </div>
    </div>
  ) : null;
}

function PopupMenuOptions({ options }: { options?: TObj<Void> }) {
  return options
    ? Object.entries(options).map(([label, cb]) => (
        <Button
          label={label}
          key={label}
          className="border-2 sm:border-2 border-zinc-400 px-3 sm:px-6 py-1 sm:py-2 text-lg sm:text-3xl rounded-2xl bg-[#000a] hover:text-zinc-400"
          onClick={() => {
            cb();
            popupMenuSignal.set({ label: ``, options: {} });
          }}
        />
      ))
    : null;
}

function onMouseDown({ target }: MouseEvent) {
  const element = document.getElementById(`popup-menu`);
  if (element && !element.contains(target as Node)) {
    popupMenuSignal.set({ label: ``, options: {} });
  }
}

export type TPopupMenu = {
  label: string;
  options?: TObj<Void>;
};
