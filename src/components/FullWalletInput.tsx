"use client";

import { useSetAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";

import { RegistrationMode } from "~/app/registration/page";
import { FetchError } from "~/lib/fetchJson";
import { seedWordCount } from "~/lib/regex";
import useUser from "~/lib/useUser";
import { buildIdentifierHash, open } from "~/lib/xmr";
import { truncatedHashIdAtom } from "~/store";

import Textarea from "./Textarea";

interface FullWalletFormValues {
  seed: string;
}

interface FullWalletInputProps {
  handleStepChange: (mode: RegistrationMode, step: number) => void;
}

const FullWalletInput = ({ handleStepChange }: FullWalletInputProps) => {
  const setTruncatedHashId = useSetAtom(truncatedHashIdAtom);
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<FullWalletFormValues>({
    mode: "onChange",
  });

  const { mutate: mutateUser } = useUser({
    redirectTo: "/dashboard",
    redirectIfFound: true,
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
    setTruncatedHashId(id);
    login(id);
    handleStepChange("fullWallet", 2);
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
          value="Next step"
          disabled={!isDirty || !isValid}
          className="btn-primary my-4"
        />
      </form>
    </>
  );
};

export default FullWalletInput;
