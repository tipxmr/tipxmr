"use client";

import { useSetAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

import { RegistrationMode } from "~/app/registration/page";
import { FetchError } from "~/lib/fetchJson";
import { primaryStagenetAddress } from "~/lib/regex";
import useUser from "~/lib/useUser";
import { buildIdentifierHash, createViewOnlyWallet } from "~/lib/xmr";
import { walletAtom } from "~/store";

import Input from "./Input";

interface ViewWalletFormValues {
  primaryAddress: string;
  privateViewKey: string;
}

interface ViewWalletInputProps {
  handleStepChange?: (mode: RegistrationMode, step: number) => void;
}

const ViewWalletInput = ({ handleStepChange }: ViewWalletInputProps) => {
  const setWallet = useSetAtom(walletAtom);

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<ViewWalletFormValues>({
    mode: "onChange",
  });

  const { mutate: mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
  });

  const createWallet: SubmitHandler<ViewWalletFormValues> = async (
    data: ViewWalletFormValues
  ) => {
    if (!isValid) return;
    const wallet = await createViewOnlyWallet(
      data.privateViewKey,
      data.primaryAddress
    );
    const privateViewKey = await wallet.getPrivateViewKey();
    const primaryAddress = await wallet.getPrimaryAddress();
    const id = buildIdentifierHash(privateViewKey, primaryAddress);
    login(id);
    setWallet(wallet);
    handleStepChange?.("viewOnlyWallet", 2);
    return wallet;
  };

  const login = (id: string) => {
    try {
      mutateUser(id);
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
        <input
          type="submit"
          value="Next step"
          disabled={!isDirty || !isValid}
          className="btn-primary my-4"
        />
      </form>
    </>
  );
};

export default ViewWalletInput;
