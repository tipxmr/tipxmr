"use client";

import type { Wallet } from "@prisma/client";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useAddWalletSetting from "~/hooks/useAddWalletSetting";
import useWalletSettings from "~/hooks/useWalletSettings";
import { constructRequestBodyFromForm } from "~/lib/ramdaHelpers";
import useUser from "~/lib/useUser";

import Input from "./Input";

const WalletSettingsForm = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { data: walletSettings } = useWalletSettings(user?.id);
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

  if (!user || !walletSettings) {
    return <span>Wallet settings loading</span>;
  }

  const handleWalletSettingsSubmit: SubmitHandler<Partial<Wallet>> = async (
    data
  ) => {
    if (!user || !isValid) return;

    const walletSettingUpdateRequest = constructRequestBodyFromForm(
      data,
      user.id
    );
    updateWalletSetting(walletSettingUpdateRequest);
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
