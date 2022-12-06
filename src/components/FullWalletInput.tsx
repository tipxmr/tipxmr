"use client";

import { Streamer } from "@prisma/client";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { FetchError } from "~/lib/fetchJson";
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
  const router = useRouter();
  const pathname = usePathname();

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<FullWalletFormValues>({
    mode: "onChange",
  });

  const createWallet: SubmitHandler<FullWalletFormValues> = async (
    data: FullWalletFormValues
  ) => {
    console.log(data);
    if (!isValid) return;
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
    router.push("/registration/username");
    return wallet;
  };

  const signIn = (id: string) => {
    try {
      login(id);
    } catch (reason) {
      if (reason instanceof FetchError) {
        console.error(reason);
      } else {
        console.error("An unexpected error happened:", reason);
      }
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
        <input
          type="submit"
          value={pathname?.includes("registration") ? "Next step" : "Login"}
          disabled={!isDirty || !isValid}
          className="btn-primary my-4 cursor-pointer"
        />
      </form>
    </>
  );
};

export default FullWalletInput;
