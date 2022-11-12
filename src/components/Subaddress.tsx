import { FileTextIcon } from "@radix-ui/react-icons";
import * as Toast from "@radix-ui/react-toast";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

type Callback = () => void;

function useTimeout(callback: Callback, delay: number | null) {
  const timeoutRef = useRef<number>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === "number") {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  return timeoutRef;
}

interface SubaddressProps {
  address: string;
  className: string;
}

const Subaddress = ({ address }: SubaddressProps) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(String(address));
  };

  useTimeout(
    () => {
      setOpen(false);
    },
    open ? 3000 : null
  );

  return (
    <>
      <Toast.Provider>
        <button
          className="rounded-full bg-gray-200 px-2 py-1 text-sm"
          onClick={handleClick}
        >
          <FileTextIcon className="mr-1 inline" />
          {address}
        </button>

        <Toast.Root open={open} onOpenChange={setOpen}>
          <Toast.Title>Copied XMR address to clipboard</Toast.Title>
        </Toast.Root>
        <Toast.Viewport className="fixed bottom-0 right-0" />
      </Toast.Provider>
    </>
  );
};

export default Subaddress;
