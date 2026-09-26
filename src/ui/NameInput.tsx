import { useEffect, useRef } from "react";
import { createSignal } from "../lib/framework";
import { capitalize, decapitalize, isValidName } from "../lib/util";

const nameInputSignal = createSignal<TNameInput | null>(null);

export function setNameInput(props: TNameInput | null) {
  nameInputSignal.set(props);
}

export function NameInput() {
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
      if (ref.current && !ref.current.contains(target as Node)) onReturn(nameInput);
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

        setNameInput({ cb, value: newValue, lowerCase });
      },
      onKeyDown: ({ key }: React.KeyboardEvent<HTMLInputElement>) => key === `Enter` && onReturn(nameInput),
    }
  );
}

function onReturn(nameInput: TNameInput | null) {
  const { cb, value } = getPropsSave(nameInput);
  if (cb && isValidName(value)) {
    cb(value);
  }
  setNameInput(null);
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

type TNameInput = { cb: (arg: string) => void; value?: string; lowerCase?: boolean };
