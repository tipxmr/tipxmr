"use client";

import { Streamer } from "@prisma/client";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useSetAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { FetchError } from "~/lib/fetchJson";
import { primaryStagenetAddress } from "~/lib/regex";
import { buildIdentifierHash, createViewOnlyWallet } from "~/lib/xmr";
import { walletAtom } from "~/store";

import Input from "./Input";

interface ViewWalletFormValues {
  primaryAddress: string;
  privateViewKey: string;
}

interface ViewWalletInputProps {
  login: (id: Streamer["id"]) => void;
}

const ViewWalletInput = ({ login }: ViewWalletInputProps) => {
  const setWallet = useSetAtom(walletAtom);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<ViewWalletFormValues>({
    mode: "onChange",
  });

  const createWallet: SubmitHandler<ViewWalletFormValues> = async (data) => {
    if (!isValid) return;
    setIsLoading(true);
    const wallet = await createViewOnlyWallet(
      data.privateViewKey,
      data.primaryAddress
    );
    const privateViewKey = await wallet.getPrivateViewKey();
    const primaryAddress = await wallet.getPrimaryAddress();
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
        <Input
          label="Private View Key"
          name="privateViewKey"
          type="text"
          control={control}
          rules={{
            required: { value: true, message: "Private View Key is required" },
            minLength: {
              value: 64,
              message: "Your Private View Key has less than 64 characters",
            },
            maxLength: {
              value: 64,
              message: "Your Private View Key has more than 64 characters",
            },
          }}
        ></Input>
        <Input
          label="Primary Address"
          name="primaryAddress"
          type="text"
          control={control}
          rules={{
            required: { value: true, message: "Primary Address is required" },
            minLength: {
              value: 95,
              message: "Primary Address has less than 95 characters",
            },
            maxLength: {
              value: 95,
              message: "Primary Address has more than 95 characters",
            },
            pattern: {
              value: primaryStagenetAddress,
              message: "Address does not match moneros address schema",
            },
          }}
        ></Input>
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

export default ViewWalletInput;
