"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { FetchError } from "~/lib/fetchJson";
import { seedWordCount } from "~/lib/regex";
import useUser from "~/lib/useUser";
import { buildIdentifierHash, open } from "~/lib/xmr";

import Textarea from "./Textarea";

interface FullWalletFormValues {
  seed: string;
}

const FullWalletInput = () => {
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
    login(id);
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
        className="mx-auto flex w-6/12 flex-col gap-2 p-8"
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
          value="Create Account"
          disabled={!isDirty || !isValid}
          className="btn-primary my-4"
        />
      </form>
    </>
  );
};

export default FullWalletInput;
