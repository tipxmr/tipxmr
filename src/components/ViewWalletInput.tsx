"use client";

import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { primaryStagenetAddress } from "~/lib/regex";
import { createViewOnlyWallet } from "~/lib/xmr";

import Input from "./Input";

interface ViewWalletFormValues {
  primaryAddress: string;
  privateViewKey: string;
}

const ViewWalletInput = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
  } = useForm<ViewWalletFormValues>({
    mode: "onChange",
  });

  const createWallet: SubmitHandler<ViewWalletFormValues> = async (
    data: ViewWalletFormValues
  ) => {
    console.log(data);
    if (!isValid) return;
    const wallet = await createViewOnlyWallet(
      data.privateViewKey,
      data.primaryAddress
    );
    return wallet;
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(createWallet)}
        className="mx-auto flex w-6/12 flex-col gap-2 p-8"
      >
        <Input
          label="Private View Key"
          name="privateViewKey"
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
          value="Create Account"
          disabled={!isDirty || !isValid}
          className="btn-primary my-4"
        />
      </form>
    </>
  );
};

export default ViewWalletInput;
