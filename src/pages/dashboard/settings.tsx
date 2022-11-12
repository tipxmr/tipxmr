import { NextPage } from "next";
import { FormEvent } from "react";

import DonationSettingsForm from "~/components/DonationSettings";
import WalletSettingsForm from "~/components/WalletSettings";
import useAddDonationSetting from "~/hooks/useAddDonationSetting";
import useAddWalletSetting from "~/hooks/useAddWalletSetting";
import useDonationSettings from "~/hooks/useDonationSettings";
import useWalletSettings from "~/hooks/useWalletSettings";
import { constructRequestBodyFromForm } from "~/lib/ramdaHelpers";
import useUser from "~/lib/useUser";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { data: donationSetting } = useDonationSettings(user?.name);
  const { data: walletSetting } = useWalletSettings(user?.id);
  const { mutate: updateDonationSetting } = useAddDonationSetting();
  const { mutate: updateWalletSetting } = useAddWalletSetting();

  console.log("donationSetting: ", donationSetting);
  console.log("walletSetting: ", walletSetting);
  const handleWalletSettingsSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) return;

    const data = new FormData(event.currentTarget);
    const body = constructRequestBodyFromForm(data, user.id);
    updateWalletSetting(body);
  };

  const handleDonationSettingsSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) return;

    const settingsFormData = new FormData(event.currentTarget);
    const donationSettingUpdateRequest = constructRequestBodyFromForm(
      settingsFormData,
      user.id
    );

    updateDonationSetting(donationSettingUpdateRequest);
  };

  return (
    <div className="container grid grid-cols-1 gap-3">
      {donationSetting && (
        <DonationSettingsForm
          donationSettings={donationSetting}
          handleSubmit={handleDonationSettingsSubmit}
        />
      )}
      {walletSetting && (
        <WalletSettingsForm
          walletSettings={walletSetting}
          handleSubmit={handleWalletSettingsSubmit}
        />
      )}
    </div>
  );
};

export default Settings;
