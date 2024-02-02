"use client";

import { type PrimitiveAtom, useAtom } from "jotai";
import type { MoneroWalletFull } from "monero-ts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LanguageSelect from "~/components/LanguageSelect";
import { createWalletFromScratch } from "~/lib/xmr";
import { walletAtom } from "~/lib/store";
import {
  LockKeyholeIcon,
  PencilIcon,
  RocketIcon,
  ShellIcon,
} from "lucide-react";

const FullWalletCreation = () => {
  const router = useRouter();
  const [seedLang, setSeedLang] = useState<string>("English");
  const [wallet, setWallet] = useAtom<MoneroWalletFull>(
    walletAtom as PrimitiveAtom<MoneroWalletFull>,
  );
  const [seed, setSeed] = useState<string | null>(null);
  const [primaryAddress, setPrimaryAddress] = useState<string | null>(null);
  const [privateViewKey, setPrivateViewKey] = useState<string | null>(null);

  useEffect(() => {
    createWalletFromScratch(seedLang).then(setWallet).catch(console.error);
  }, [seedLang, setWallet]);

  useEffect(() => {
    wallet?.getSeed().then(setSeed).catch(console.error);
    wallet?.getPrimaryAddress().then(setPrimaryAddress).catch(console.error);

    wallet?.getPrivateViewKey().then(setPrivateViewKey).catch(console.error);
  }, [wallet]);

  const handleSetSeedLang = (language: string) => {
    setSeed(null);
    setPrimaryAddress(null);
    setPrivateViewKey(null);
    setSeedLang(language);
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <div>
        <h3 className="text-center">Your XMR wallet seedphrase</h3>
        {seed ? (
          <CredentialBox text={seed} label="Seed phrase" />
        ) : (
          <ShellIcon className="mx-auto my-12 h-12 w-12 animate-spin" />
        )}
        <CredentialBox text={privateViewKey} label="Private ViewKey" />
        <CredentialBox text={primaryAddress} label="Primary Address" />
        <div className="mt-4 flex flex-col items-center">
          <LanguageSelect language={seedLang} onChange={handleSetSeedLang} />
        </div>
      </div>
      <ul className="mt-4 flex flex-col gap-6 text-left">
        <li className="grid grid-cols-[auto_1fr] gap-x-3">
          <span className="row-span-2 inline-flex items-center justify-center rounded-full bg-blue-500 text-white">
            <PencilIcon className="h-12 w-12 p-3" />
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
            <LockKeyholeIcon className="h-12 w-12 p-3" />
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
      <button
        className="btn-primary mt-4 w-full"
        disabled={!seed}
        onClick={() => router.push("/registration/username")}
      >
        Next step
      </button>
    </div>
  );
};

function CredentialBox({
  text,
  label,
}: {
  text: string | null;
  label: string;
}) {
  if (!text) return null;
  return (
    <>
      <p>{label}</p>
      <div className="break-words border border-border p-8 font-mono">
        {text}
      </div>
    </>
  );
}

export default FullWalletCreation;
