import { Grid } from "@mui/material";
import { assoc } from "ramda";
import { NextPage } from "next";
import { FormEvent } from "react";
import DonationSettingsForm from "~/components/DonationSettings";
import fetchJson from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import WalletSettingsForm from "~/components/WalletSettings";
import useDonationSettings from "~/hooks/useDonationSettings";
import useWalletSettings from "~/hooks/useWalletSettings";
import { useMutation, useQueryClient } from "react-query";
import { DonationSettings, Wallet } from "@prisma/client";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  const { data: donationSettings } = useDonationSettings(user?.name);
  const { data: walletSettings } = useWalletSettings(user?.id);

  const queryClient = useQueryClient();

  const addDonationSettings = useMutation(
    (donationSettings) => {
      const body = { donationSettings };
      return fetchJson(`/api/donation-settings/update/${user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    {
      onMutate: async (settings: DonationSettings) => {
        await queryClient.cancelQueries(["streamer", user?.name]);
        const previousSettings = queryClient.getQueryData<DonationSettings>([
          "streamer",
          user?.name,
        ]);

        console.log({ settings });

        if (previousSettings) {
          queryClient.setQueryData<DonationSettings>(["streamer", user?.name], {
            ...previousSettings,
          });
        }

        return { previousSettings };
      },
      onError: (err, variables, context) => {
        if (context?.previousSettings) {
          queryClient.setQueryData<DonationSettings>(
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
    // TODO do we need to validate?

    let updateData = {};

    for (const pair of data.entries()) {
      // this
      if (pair.at(1) === "") {
        continue;
      }

      updateData = assoc(pair[0], Number(pair[1]), updateData);
    }
    const body = {
      streamer: user.id,
      data: {
        ...updateData,
      },
    };

    addWalletSettings.mutate(body);
  };

  const handleDonationSettingsSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    if (!user) return;

    const data = new FormData(event.currentTarget);
    // TODO do we need to validate?

    let updateData = {};

    for (const pair of data.entries()) {
      // this
      if (pair.at(1) === "") {
        continue;
      }

      updateData = assoc(pair[0], Number(pair[1]), updateData);
    }
    const body = {
      streamer: user.id,
      data: {
        ...updateData,
      },
    };

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
      {donationSettings && (
        <Grid item xs={12}>
          <DonationSettingsForm
            donationSettings={donationSettings}
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
