import { FileTextIcon } from "@radix-ui/react-icons";
import * as Toast from "@radix-ui/react-toast";
import { useMemo, useState } from "react";

import useTimeout from "~/lib/hooks/use-timeout";

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

interface SubaddressProps {
  address: string;
}

const Subaddress = ({ address }: SubaddressProps) => {
  const [open, setOpen] = useState(false);
  const truncatedAddress = useMemo(() => shortenAddress(address), [address]);

  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(String(address));
  };

  useTimeout(
    () => {
      setOpen(false);
    },
    open ? 3000 : undefined,
  );

  return (
    <>
      <Toast.Provider>
        <button
          className="rounded-full bg-gray-200 px-2 py-1 text-sm"
          onClick={handleClick}
        >
          <FileTextIcon className="mr-1 inline" />
          {truncatedAddress}
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
