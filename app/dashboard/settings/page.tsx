"use client";

import { NextPage } from "next";

import DonationSettingsForm from "~/components/DonationSettings";
import WalletSettingsForm from "~/components/WalletSettings";
import useUser from "~/lib/useUser";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });

  return (
    <div className="container grid grid-cols-2 gap-3">
      <DonationSettingsForm />
      <WalletSettingsForm />
    </div>
  );
};

export default Settings;
