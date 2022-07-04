import { Grid } from "@mui/material";
import { NextPage } from "next";
import { FormEvent } from "react";
import DonationSettingsForm from "~/components/DonationSettings";
import useUser from "~/lib/useUser";
import WalletSettingsForm from "~/components/WalletSettings";
import useDonationSettings from "~/hooks/useDonationSettings";
import useWalletSettings from "~/hooks/useWalletSettings";
import { constructRequestBodyFromForm } from "~/lib/ramdaHelpers";
import useAddWalletSetting from "~/hooks/useAddWalletSetting";
import useAddDonationSetting from "~/hooks/useAddDonationSetting";

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
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {donationSetting && (
        <Grid item xs={12}>
          <DonationSettingsForm
            donationSettings={donationSetting}
            handleSubmit={handleDonationSettingsSubmit}
          />
        </Grid>
      )}
      {walletSetting && (
        <Grid item xs={12}>
          <WalletSettingsForm
            walletSettings={walletSetting}
            handleSubmit={handleWalletSettingsSubmit}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Settings;
