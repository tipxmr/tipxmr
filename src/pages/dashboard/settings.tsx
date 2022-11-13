import { NextPage } from "next";
import { FormEvent } from "react";

import DonationSettingsForm from "~/components/DonationSettings";
import WalletSettingsForm from "~/components/WalletSettings";
import useAddWalletSetting from "~/hooks/useAddWalletSetting";
import useWalletSettings from "~/hooks/useWalletSettings";
import { constructRequestBodyFromForm } from "~/lib/ramdaHelpers";
import useUser from "~/lib/useUser";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { data: walletSetting } = useWalletSettings(user?.id);
  const { mutate: updateWalletSetting } = useAddWalletSetting();

  const handleWalletSettingsSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) return;

    const data = new FormData(event.currentTarget);
    const body = constructRequestBodyFromForm(data, user.id);
    updateWalletSetting(body);
  };

  return (
    <div className="container grid grid-cols-2 gap-3">
      <DonationSettingsForm />
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
