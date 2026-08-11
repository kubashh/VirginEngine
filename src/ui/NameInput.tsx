import { useEffect, useRef } from "react";
import { nameInputSignal } from "../lib/consts";
import { capitalize, decapitalize, isValidName } from "../lib/util";

export default function NameInput() {
  const ref = useRef<HTMLInputElement>(null);
  const props = useNameInput(ref);

  return props ? (
    <input
      ref={ref}
      type="text"
      className="text-4xl translate-x-[calc(50vw-50%)] translate-y-[calc(50vh-50%)]"
      {...props}
      autoFocus
    />
  ) : null;
}

function useNameInput(ref: React.RefObject<HTMLInputElement | null>) {
  const nameInput = nameInputSignal.use();
  const { cb, value, lowerCase } = getPropsSave(nameInput);

  useEffect(() => {
    if (!ref) return;

    function handler({ target }: MouseEvent) {
      if (ref.current && !ref.current.contains(target as Node)) onReturn();
    }

    document.addEventListener(`mousedown`, handler);

    return () => document.removeEventListener(`mousedown`, handler);
  });

  return (
    cb && {
      value,
      onChange: ({ target }: { target: { value: string } }) => {
        const newValue = lowerCase ? decapitalize(target.value) : capitalize(target.value);

        if (!isValidName(newValue)) return;

        nameInputSignal.set({ cb, value: newValue, lowerCase });
      },
      onKeyDown: ({ key }: React.KeyboardEvent<HTMLInputElement>) => key === `Enter` && onReturn(),
    }
  );
}

function onReturn() {
  const { cb, value } = getPropsSave(nameInputSignal.get());
  if (cb && isValidName(value)) {
    cb(value);
  }
  nameInputSignal.set(null);
}

function getPropsSave(nameInput: TNameInput | null): {
  cb: ((arg: string) => void) | null;
  value: string;
  lowerCase?: boolean;
} {
  return {
    cb: nameInput && nameInput.cb,
    value: (nameInput && nameInput.value) || ``,
    lowerCase: (nameInput && nameInput.lowerCase) || false,
  };
}

export type TNameInput = { cb: (arg: string) => void; value?: string; lowerCase?: boolean };
