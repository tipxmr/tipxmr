"use client";

import type { DonationSetting } from "@prisma/client";
import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useAddDonationSetting from "~/hooks/useAddDonationSetting";
import useDonationSettings from "~/hooks/useDonationSettings";
import useUser from "~/lib/useUser";

import Input from "./Input";

const DonationSettingsForm: FC = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const {
    data: donationSettings,
    isLoading,
    isError,
    error,
  } = useDonationSettings(user?.name);
  const { mutate: updateDonationSetting } = useAddDonationSetting();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<DonationSetting>({
    defaultValues: donationSettings,
    mode: "onChange",
  });

  useEffect(() => {
    reset(donationSettings);
  }, [donationSettings, reset]);

  if (isLoading || !user) {
    return <span>Loading Donation Settings</span>;
  }

  if (isError) {
    return <span>Error while loading DonationSettings: {error.message}</span>;
  }

  const handleDonationSettingsSubmit: SubmitHandler<
    Partial<DonationSetting>
  > = async (formData) => {
    if (!user || !isValid) return;
    const data = {
      streamer: formData.streamer,
      secondPrice: Number(formData.secondPrice),
      charPrice: Number(formData.charPrice),
      charLimit: Number(formData.charLimit),
      minAmount: Number(formData.minAmount),
      gifsMinAmount: Number(formData.gifsMinAmount),
    };
    updateDonationSetting(data);
  };

  return (
    <form
      className="flex flex-col items-center gap-y-2 p-4"
      onSubmit={handleSubmit(handleDonationSettingsSubmit)}
    >
      <h3 className="text-center text-3xl">Dontation Settings</h3>
      <Input
        label="XMR price per second of showtime"
        name="secondPrice"
        type="number"
        control={control}
      ></Input>
      <Input
        label="XMR price per character"
        name="charPrice"
        type="number"
        control={control}
      ></Input>
      <Input
        label="The maximum amount of characters per message"
        name="charLimit"
        type="number"
        control={control}
      ></Input>
      <Input
        label="Minimum XMR amount for donation"
        name="minAmount"
        type="number"
        control={control}
      ></Input>
      <Input
        label="Minimum XMR amount for sending GIFs"
        name="gifsMinAmount"
        type="number"
        rules={{
          min: {
            value: 0,
            message: "",
          },
        }}
        control={control}
      ></Input>
      <Input
        label="Funding goal"
        name="goal"
        type="number"
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
export default DonationSettingsForm;
