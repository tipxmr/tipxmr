"use client";
import { ClipboardCheckIcon } from "lucide-react";
import { toast } from "sonner";

import {
  addHyphensTo16CharacterString,
  shortenMoneroSubaddress,
} from "~/lib/utils";

const FormattedStringTypes = {
  SUBADDRESS: "subaddress",
  ACCOUNT_NUMBER: "accountNumber",
} as const;

interface Props {
  input?: string;
  stringType: "subaddress" | "accountNumber";
}

export default function CopyableString({ input, stringType }: Props) {
  if (!input) return <div>Loading...</div>;

  let formattedString;
  switch (stringType) {
    case FormattedStringTypes.ACCOUNT_NUMBER:
      formattedString = addHyphensTo16CharacterString(input);
    case FormattedStringTypes.SUBADDRESS:
      formattedString = shortenMoneroSubaddress(
        input,
        window?.screen?.availWidth < 700 ? 4 : 10,
      );
  }

  return (
    <button
      onClick={async () => {
        navigator.clipboard.writeText(input).catch(console.error);
        toast(`Copied to clipboard ${shortenMoneroSubaddress(input, 10)}`);
      }}
      className="flex items-center justify-center gap-4 rounded-md border-2 border-border px-4"
    >
      <pre className="m-2 w-full py-1 text-center md:px-2 md:text-2xl ">
        {formattedString}
      </pre>
      <ClipboardCheckIcon size={50} />
    </button>
  );
}
