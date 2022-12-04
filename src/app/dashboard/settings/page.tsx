import { NextPage } from "next";

import DonationSettingsForm from "~/components/DonationSettings";
import WalletSettingsForm from "~/components/WalletSettings";

const Settings: NextPage = () => {
  return (
    <div className="container grid grid-cols-2 gap-3">
      <DonationSettingsForm />
      <WalletSettingsForm />
    </div>
  );
};

export default Settings;
