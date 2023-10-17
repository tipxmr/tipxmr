import { NextPage } from "next";

import DonationSettingsForm from "~/components/DonationSettings";
import WalletSettingsForm from "~/components/WalletSettings";

const Settings: NextPage = () => {
  return (
    <main className="container grid grid-cols-2 gap-3">
      <h1>Update your settings here</h1>
      <DonationSettingsForm />
      <WalletSettingsForm />
    </main>
  );
};

export default Settings;
