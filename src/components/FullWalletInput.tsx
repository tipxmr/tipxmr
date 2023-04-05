"use client";

import { Streamer } from "@prisma/client";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { seedWordCount } from "~/lib/regex";
import { buildIdentifierHash, open } from "~/lib/xmr";
import { walletAtom } from "~/store";

import Textarea from "./Textarea";

interface FullWalletFormValues {
  seed: string;
}

interface FullWalletInputProps {
  login: (id: Streamer["id"]) => void;
}

const FullWalletInput = ({ login }: FullWalletInputProps) => {
  const setWallet = useSetAtom(walletAtom);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<FullWalletFormValues>({
    mode: "onChange",
  });

  const createWallet: SubmitHandler<FullWalletFormValues> = async (data) => {
    if (!isValid) return;
    setIsLoading(true);
    const wallet = await open(data.seed);
    const privateViewKey = await wallet.getPrivateViewKey();
    const primaryAddress = await wallet.getPrimaryAddress();
    console.log(
      "primaryAddress, privateViewKey:",
      primaryAddress,
      privateViewKey
    );
    const id = buildIdentifierHash(privateViewKey, primaryAddress);
    signIn(id);
    setWallet(wallet);
    setIsLoading(false);
    return wallet;
  };

  const signIn = (id: string) => {
    try {
      login(id);
    } catch (reason) {
      console.error("An unexpected error happened:", reason);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(createWallet)}
        className="mx-auto flex flex-col gap-2"
      >
        <Textarea
          name="seed"
          label="Your seed (25 words)"
          textareaClassName="font-mono h-24"
          rules={{
            pattern: {
              value: seedWordCount,
              message: "seed must contain 25 words",
            },
          }}
          control={control}
        />
        {isLoading && (
          <>
            <UpdateIcon className="mx-auto my-8 h-12 w-12 animate-spin" />
            This can take some time
          </>
        )}
        <input
          type="submit"
          value={pathname?.includes("registration") ? "Next step" : "Login"}
          disabled={!isDirty || !isValid || isLoading}
          className="btn-primary my-4"
        />
      </form>
    </>
  );
};

export default FullWalletInput;
