import { Grid } from "@mui/material";
import { NextPage } from "next";
import { FormEvent } from "react";
import DonationSettingsForm from "~/components/DonationSettings";
import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import WalletSettingsForm from "~/components/WalletSettings";
import useDonationSettings from "~/hooks/useDonationSettings";
import useWalletSettings from "~/hooks/useWalletSettings";
import { useMutation, useQueryClient } from "react-query";
import { DonationSetting, Wallet } from "@prisma/client";
import { constructRequestBodyFromForm } from "~/lib/ramdaHelpers";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { data: donationSetting } = useDonationSettings(user?.name);
  const { data: walletSettings } = useWalletSettings(user?.id);

  const queryClient = useQueryClient();

  const addDonationSettings = useMutation(
    (donationSetting) => {
      const body = { donationSetting };
      return fetchJson(`/api/donation-settings/update/${user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    {
      onMutate: async (settings: DonationSetting) => {
        await queryClient.cancelQueries(["streamer", user?.name]);
        const previousSettings = queryClient.getQueryData<DonationSetting>([
          "streamer",
          user?.name,
        ]);

        console.log({ settings });

        if (previousSettings) {
          queryClient.setQueryData<DonationSetting>(["streamer", user?.name], {
            ...previousSettings,
          });
        }

        return { previousSettings };
      },
      onError: (err, variables, context) => {
        if (context?.previousSettings) {
          queryClient.setQueryData<DonationSetting>(
            ["streamer", user?.name],
            context.previousSettings
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["streamer", user?.name]);
      },
    }
  );
  const addWalletSettings = useMutation(
    (walletSettings) => {
      const body = { walletSettings };
      return fetchJson(`/api/wallet/settings/update/${user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    {
      onMutate: async (settings: Wallet) => {
        await queryClient.cancelQueries(["streamer", user?.id]);
        const previousSettings = queryClient.getQueryData<Wallet>([
          "streamer",
          user?.id,
        ]);

        console.log({ settings });

        if (previousSettings) {
          queryClient.setQueryData<Wallet>(["streamer", user?.id], {
            ...previousSettings,
          });
        }

        return { previousSettings };
      },
      onError: (err, variables, context) => {
        if (context?.previousSettings) {
          queryClient.setQueryData<Wallet>(
            ["streamer", user?.id],
            context.previousSettings
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["streamer", user?.id]);
      },
    }
  );

  const handleWalletSettingsSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) return;

    const data = new FormData(event.currentTarget);
    const body = constructRequestBodyFromForm(data, user.id);
    addWalletSettings.mutate(body);
  };

  const handleDonationSettingsSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) return;

    const settingsFormData = new FormData(event.currentTarget);
    const body = constructRequestBodyFromForm(settingsFormData, user.id);

    addDonationSettings.mutate(body);
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
            donationSetting={donationSetting}
            handleSubmit={handleDonationSettingsSubmit}
          />
        </Grid>
      )}
      {walletSettings && (
        <Grid item xs={12}>
          <WalletSettingsForm
            walletSettings={walletSettings}
            handleSubmit={handleWalletSettingsSubmit}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Settings;
