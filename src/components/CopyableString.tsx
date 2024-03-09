"use client";
import { ClipboardCheckIcon } from "lucide-react";
import { toast } from "sonner";

import {
  addHyphensTo16CharacterString,
  shortenMoneroSubaddress,
} from "~/lib/utils";

export const FormattedStringConstants = {
  SUBADDRESS: "subaddress",
  ACCOUNT_NUMBER: "accountNumber",
} as const;

export type FormattedStringType =
  (typeof FormattedStringConstants)[keyof typeof FormattedStringConstants];

interface CopyableStringProps {
  input: string;
  stringType: FormattedStringType;
}

const formatString = ({ input, stringType }: CopyableStringProps) => {
  if (!input || typeof window === "undefined") return "";

  switch (stringType) {
    case FormattedStringConstants.ACCOUNT_NUMBER:
      return addHyphensTo16CharacterString(input);
    case FormattedStringConstants.SUBADDRESS:
      return shortenMoneroSubaddress(
        input,
        window.screen.availWidth < 700 ? 4 : 10,
      );
  }
};

export default function CopyableString({
  input,
  stringType,
}: CopyableStringProps) {
  const formattedString = formatString({ input, stringType });

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
