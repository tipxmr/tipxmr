"use client";

import {
  LockKeyholeIcon,
  PencilIcon,
  RocketIcon,
  ShellIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";

import { MoneroNetworkType, createWalletFull } from "monero-ts";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import LanguageSelect from "~/components/LanguageSelect";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useWallet } from "~/context/useWalletContext";
import { buildIdentifierHash, createWalletFromScratch } from "~/lib/xmr";
import { clearWalletLocalStorage } from "~/lib/utils";
import { CredentialBox } from "./CredentialBox";

interface ConfirmWalletOverwriteDialogProps {
  open: boolean;
  onCreateNewWallet: () => void;
  onSingInWithExistingWallet: () => void;
}

const ConfirmWalletOverwriteDialog = ({
  open,
  onSingInWithExistingWallet,
  onCreateNewWallet,
}: ConfirmWalletOverwriteDialogProps) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Overwrite existing Wallet?</AlertDialogTitle>
          <AlertDialogDescription>
            TipXMR detected, you already have a wallet. Do you want to overwrite
            it and create a new one?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onSingInWithExistingWallet}>
            Use existing wallet
          </AlertDialogCancel>
          <AlertDialogAction onClick={onCreateNewWallet}>
            Create new wallet
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const FullWalletCreation = () => {
  const [seedLang, setSeedLang] = useState<string>("English");
  const [seed, setSeed] = useState<string>();
  const [primaryAddress, setPrimaryAddress] = useState<string>();
  const [privateViewKey, setPrivateViewKey] = useState<string>();
  const [showOverwriteDialog, setShowOverwriteDialog] = useState(false);

  const walletContext = useWallet();

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

    const truncatedHashId = buildIdentifierHash(privateViewKey, primaryAddress);

    walletContext.wallet = wallet;
    walletContext.truncatedHashId = truncatedHashId;
    setSeed("no seed");
    setPrimaryAddress(primaryAddress);
    setPrivateViewKey(privateViewKey);
  };

  const createNewWallet = useCallback(async () => {
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
  }, [seedLang, walletContext]);

  useEffect(() => {
    const primaryAddress = localStorage.getItem("address");
    const privateViewKey = localStorage.getItem("key");

    if (primaryAddress && privateViewKey) {
      setShowOverwriteDialog(true);
    } else {
      createNewWallet().catch(console.error);
    }
  }, [createNewWallet, seedLang, walletContext]);

  const handleSetSeedLang = (language: string) => {
    setSeed(undefined);
    setPrimaryAddress(undefined);
    setPrivateViewKey(undefined);
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
      <ConfirmWalletOverwriteDialog
        open={showOverwriteDialog}
        onSingInWithExistingWallet={() => {
          setShowOverwriteDialog(false);
          signIntoExistingWallet().catch(console.error);
        }}
        onCreateNewWallet={() => {
          setShowOverwriteDialog(false);
          clearWalletLocalStorage();
          createNewWallet().catch(console.error);
        }}
      />
      {seed ? (
        <div className="grid grid-flow-row grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <CredentialBox text={seed} label="Your Seed Phrase" />
          </div>

          <CredentialBox text={privateViewKey} label="Your Private ViewKey" />

          <CredentialBox text={primaryAddress} label="Your Primary Address" />
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
              <span className="row-span-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
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
        <Link href="/registration/username">
          <Button disabled={!seed}>Next step</Button>
        </Link>
      </div>
      <Separator className="my-4" />
    </div>
  );
};

export default FullWalletCreation;
