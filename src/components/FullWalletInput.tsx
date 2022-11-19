"use client";

import { SubmitHandler, useForm } from "react-hook-form";

import { seedWordCount } from "~/lib/regex";
import { open } from "~/lib/xmr";

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

  const createWallet: SubmitHandler<FullWalletFormValues> = async (
    data: FullWalletFormValues
  ) => {
    console.log(data);
    if (!isValid) return;
    const wallet = await open(data.seed);
    return wallet;
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
