import {
  LockClosedIcon,
  Pencil1Icon,
  RocketIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { PrimitiveAtom, useAtom } from "jotai";
import { MoneroWalletFull } from "monero-javascript";
import Link from "next/link";
import { useEffect, useState } from "react";

import LanguageSelector from "~/components/LanguageSelector";
import { createWalletFromScratch } from "~/lib/xmr";
import { walletAtom } from "~/store";

const FullWalletCreation = () => {
  const [seedLang, setSeedLang] = useState<string>("English");
  const [wallet, setWallet] = useAtom<MoneroWalletFull>(
    walletAtom as PrimitiveAtom<MoneroWalletFull>
  );
  const [seed, setSeed] = useState<string | null>(null);
  const [primaryAddress, setPrimaryAddress] = useState<string | null>(null);
  const [privateViewKey, setPrivateViewKey] = useState<string | null>(null);

  useEffect(() => {
    createWalletFromScratch(seedLang).then(setWallet);
  }, [seedLang, setWallet]);

  useEffect(() => {
    wallet?.getMnemonic().then(setSeed);
    wallet?.getPrimaryAddress().then(setPrimaryAddress);
    wallet?.getPrivateViewKey().then(setPrivateViewKey);
  }, [wallet]);

  const handleSetSeedLang = (language: string) => {
    setSeedLang(language);
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div>
        <h3 className="text-center">Your XMR wallet seedphrase</h3>
        {seed ? (
          <div className="bg-white p-8 font-mono">{seed}</div>
        ) : (
          <UpdateIcon className="mx-auto my-12 h-12 w-12 animate-spin" />
        )}
        {primaryAddress && (
          <>
            <p>Primary Address</p>
            <div className="break-words bg-white p-8 font-mono">
              {primaryAddress}
            </div>
          </>
        )}
        {privateViewKey && (
          <>
            <p>Private View Key</p>
            <div className="break-words bg-white p-8 font-mono">
              {privateViewKey}
            </div>
          </>
        )}
        <div className="mt-4 flex flex-col items-center">
          <LanguageSelector language={seedLang} onChange={handleSetSeedLang} />
        </div>
      </div>
      <ul className="mt-4 flex flex-col gap-6 text-left">
        <li className="grid grid-cols-[auto_1fr] gap-x-3">
          <span className="row-span-2 inline-flex items-center justify-center rounded-full bg-blue-500 text-white">
            <Pencil1Icon className="h-12 w-12 p-3" />
          </span>

          <span className="col-start-2 text-base text-slate-800">
            Note down your seed phrase
          </span>
          <span className="col-start-2 text-sm text-slate-500">
            You need to to sign into TipXMR
          </span>
        </li>

        <li className="grid grid-cols-[auto_1fr] gap-x-3">
          <span className="row-span-2 inline-flex items-center justify-center rounded-full bg-blue-500 text-white">
            <LockClosedIcon className="h-12 w-12 p-3" />
          </span>

          <span className="col-start-2 text-base text-slate-800">
            Keep your seed secure
          </span>
          <span className="col-start-2 text-sm text-slate-500">
            {`Don't lose it or show it to anybody. It is best kept offline.`}
          </span>
        </li>

        <li className="grid grid-cols-[auto_1fr] gap-x-3">
          <span className="row-span-2 inline-flex items-center justify-center rounded-full bg-blue-500 text-white">
            <RocketIcon className="h-12 w-12 p-3" />
          </span>

          <span className="col-start-2 text-base text-slate-800">
            These words hold your money!
          </span>
          <span className="col-start-2 text-sm text-slate-500">
            It is the ultimate backup to your sweet Moneroj
          </span>
        </li>
      </ul>
      <Link href="/registration/username">
        <button className="btn-primary mt-4 w-full" disabled={!seed}>
          Next step
        </button>
      </Link>
    </div>
  );
};

export default FullWalletCreation;
