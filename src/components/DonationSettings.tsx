import type { DonationSetting } from "@prisma/client";
import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import useAddDonationSetting from "~/hooks/useAddDonationSetting";
import useDonationSettings from "~/hooks/useDonationSettings";
import { constructRequestBodyFromForm } from "~/lib/ramdaHelpers";
import useUser from "~/lib/useUser";

import Input from "./Input";

const DonationSettingsForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationSetting>();
  console.log("errors", errors);
  const { user } = useUser({ redirectTo: "/login" });
  const { data: donationSettings } = useDonationSettings(user?.name);
  const { mutate: updateDonationSetting } = useAddDonationSetting();

  if (!donationSettings || !user) {
    return <span>Loading Donation Settings</span>;
  }

  const { secondPrice, charPrice, charLimit, minAmount, gifsMinAmount, goal } =
    donationSettings;

  const handleDonationSettingsSubmit: SubmitHandler<
    Partial<DonationSetting>
  > = async (data) => {
    if (!user) return;
    const donationSettingUpdateRequest = constructRequestBodyFromForm(
      data,
      user.id
    );

    updateDonationSetting(donationSettingUpdateRequest);
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
        placeholder={String(secondPrice)}
        register={register}
        required={false}
        errorMessage={errors?.["secondPrice"]?.message?.toString()}
      ></Input>
      <Input
        label="XMR price per character"
        name="charPrice"
        placeholder={String(charPrice)}
        register={register}
        required={false}
        errorMessage={errors?.["charPrice"]?.message?.toString()}
      ></Input>
      <Input
        label="The maximum amount of characters per message"
        name="charLimit"
        placeholder={String(charLimit)}
        register={register}
        required={false}
        errorMessage={errors?.["charLimit"]?.message?.toString()}
      ></Input>
      <Input
        label="Minimum XMR amount for donation"
        name="minAmount"
        placeholder={String(minAmount)}
        register={register}
        required={false}
        errorMessage={errors?.["minAmount"]?.message?.toString()}
      ></Input>
      <Input
        label="Minimum XMR amount for sending GIFs"
        name="gifsMinAmount"
        placeholder={String(gifsMinAmount)}
        register={register}
        required={false}
        errorMessage={errors?.["gifsMinAmount"]?.message?.toString()}
      ></Input>
      <Input
        label="Funding goal"
        name="goal"
        placeholder={String(goal)}
        register={register}
        required={false}
        errorMessage={errors?.["goal"]?.message?.toString()}
      ></Input>
      <input type="submit" value="Save settings" className="btn-primary" />
    </form>
  );
};
export default DonationSettingsForm;
