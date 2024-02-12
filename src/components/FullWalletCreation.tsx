"use client";

import {
  LockKeyholeIcon,
  PencilIcon,
  RocketIcon,
  ShellIcon,
} from "lucide-react";
import { MoneroNetworkType, createWalletFull } from "monero-ts";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LanguageSelect from "~/components/LanguageSelect";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useWallet } from "~/context/useWalletContext";
import { buildIdentifierHash, createWalletFromScratch } from "~/lib/xmr";

const FullWalletCreation = () => {
  const router = useRouter();
  const [seedLang, setSeedLang] = useState<string>("English");
  const [seed, setSeed] = useState<string | null>(null);
  const [primaryAddress, setPrimaryAddress] = useState<string | null>(null);
  const [privateViewKey, setPrivateViewKey] = useState<string | null>(null);

  const walletContext = useWallet();

  useEffect(() => {
    const primaryAddress = localStorage.getItem("primaryAddress");
    const privateViewKey = localStorage.getItem("privateViewKey");

    const signIntoExistingWallet = async () => {
      if (!primaryAddress || !privateViewKey) return;

      const wallet = await createWalletFull({
        primaryAddress,
        privateViewKey,
        networkType: MoneroNetworkType.STAGENET,
        server: {
          uri: "stagenet.community.rino.io:38081",
        },
      });

      const truncatedHashId = buildIdentifierHash(
        privateViewKey,
        primaryAddress,
      );

      walletContext.wallet = wallet;
      walletContext.truncatedHashId = truncatedHashId;
      setSeed("no seed");
      setPrimaryAddress(primaryAddress);
      setPrivateViewKey(privateViewKey);
    };

    const createNewWallet = async () => {
      const wallet = await createWalletFromScratch(seedLang);
      const seed = await wallet.getSeed();
      const address = await wallet.getPrimaryAddress();
      const privateViewKey = await wallet.getPrivateViewKey();

      const key = await wallet.getPrivateViewKey();

      localStorage.setItem("address", address);
      localStorage.setItem("key", key);

      const truncatedHashId = buildIdentifierHash(privateViewKey, address);

      walletContext.wallet = wallet;
      walletContext.truncatedHashId = truncatedHashId;
      setSeed(seed);
      setPrimaryAddress(address);
      setPrivateViewKey(key);
    };

    if (primaryAddress && privateViewKey) {
      signIntoExistingWallet().catch(console.error);
    } else {
      createNewWallet().catch(console.error);
    }
  }, [seedLang, walletContext]);

  const handleSetSeedLang = (language: string) => {
    setSeed(null);
    setPrimaryAddress(null);
    setPrivateViewKey(null);
    setSeedLang(language);
  };

  const infoPoints = [
    {
      icon: PencilIcon,
      heading: "Note down your seed phrase",
      content: "You need to to sign into TipXMR",
    },
    {
      icon: LockKeyholeIcon,
      heading: "Keep your seed secure",
      content: "Don't lose it or show it to anybody. It is best kept offline.",
    },
    {
      icon: RocketIcon,
      heading: "These words hold your money!",
      content: "It is the ultimate backup to your sweet Moneroj",
    },
  ];

  return (
    <div className="my-4 flex flex-col gap-2">
      {seed ? (
        <div className="grid grid-flow-row grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <CredentialBox text={seed} label="Seed phrase" />
          </div>

          <CredentialBox text={privateViewKey} label="Private ViewKey" />

          <CredentialBox text={primaryAddress} label="Primary Address" />
        </div>
      ) : (
        <ShellIcon className="mx-auto my-12 h-12 w-12 animate-spin" />
      )}

      <div className="mt-4 flex flex-col items-center">
        <LanguageSelect language={seedLang} onChange={handleSetSeedLang} />
      </div>
      <div className="w-md mx-auto my-4">
        <ul className="mt-4 flex flex-col justify-center gap-6 text-left">
          {infoPoints.map((point) => (
            <li
              className="grid grid-cols-[auto_1fr] gap-x-3"
              key={point.heading}
            >
              <span className="row-span-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white">
                {<point.icon className="h-12 w-12 p-3" />}
              </span>

              <span className="col-start-2 text-base text-slate-800">
                {point.heading}
              </span>

              <span className="col-start-2 text-sm text-slate-500">
                {point.content}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={!seed}
          onClick={() => router.push("/registration/username")}
        >
          Next step
        </Button>
      </div>
      <Separator className="my-4" />
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
    <div className="flex h-full flex-col space-y-4 break-words rounded-md border border-border p-8 font-mono">
      <p className="text-right lowercase tracking-tight text-muted-foreground">
        your {label}
      </p>
      <p>{text}</p>
    </div>
  );
}

export default FullWalletCreation;
