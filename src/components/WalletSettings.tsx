"use client";

import type { Wallet } from "@prisma/client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useAddWalletSetting from "~/hooks/useAddWalletSetting";
import useWalletSettings from "~/hooks/useWalletSettings";
import useUser from "~/lib/useUser";

import Input from "./Input";

const WalletSettingsForm = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const {
    data: walletSettings,
    isLoading,
    isError,
    error,
  } = useWalletSettings(user?.id);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<Wallet>({ defaultValues: walletSettings, mode: "onChange" });
  const { mutate: updateWalletSetting } = useAddWalletSetting();

  useEffect(() => {
    reset(walletSettings);
  }, [walletSettings, reset]);

  if (isLoading || !user) {
    return <span>Loading Wallet Settings</span>;
  }

  if (isError) {
    return <span>Error while loading WalletSettings: {error.message}</span>;
  }

  const handleWalletSettingsSubmit: SubmitHandler<Partial<Wallet>> = (
    formData,
  ) => {
    if (!user || !isValid) return;
    const data = {
      streamer: formData.streamer,
      restoreHeight: Number(formData.restoreHeight),
      lastSyncHeight: Number(formData.lastSyncHeight),
    };
    updateWalletSetting(data);
  };

  return (
    <form
      className="flex flex-col items-center gap-y-2 p-4"
      onSubmit={handleSubmit(handleWalletSettingsSubmit)}
    >
      <h3 className="text-center text-3xl">Wallet Settings</h3>
      <Input
        label="Restore height"
        name="restoreHeight"
        type="number"
        rules={{
          min: {
            value: 0,
            message: "",
          },
        }}
        control={control}
      ></Input>

      <input
        type="submit"
        value="Save settings"
        className="btn-primary"
        disabled={!isDirty || !isValid}
      />
    </form>
  );
};
export default WalletSettingsForm;
