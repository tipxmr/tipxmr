import {
  Typography,
  Input,
  Button,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { Account, Donation_settings, Streamer, Wallet } from "@prisma/client";
import { assoc } from "ramda";
import { NextPage } from "next";
import { useState, useEffect, FormEvent } from "react";
import useSWR from "swr";
import { DonationSettingsForm } from "~/components";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import useUser from "~/lib/useUser";
import WalletSettingsForm from "~/components/forms/WalletSettings";

const useDonationSettings = (name: Streamer["name"]) => {
  return useSWR(() => (name ? `/api/donation-settings/${name}` : null));
};

const useWalletSettings = (id: Streamer["id"]) => {
  console.log("Requesting wallet settings for ", id);
  return useSWR(() => (id ? `/api/wallet/settings/${id}` : null));
};

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });
  console.log(`Username ${user?.name}`);
  const { data: donationSettings } = useDonationSettings(user?.name);
  const { data: walletSettings } = useWalletSettings(user?.id);

  console.log("Wallet settings", walletSettings);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
      ...updateData,
    };

    console.log(`API Body `, body);

    try {
      const result = await fetchJson(
        `/api/donation-settings/update/${user?.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      console.log(result);
    } catch (reason) {
      if (reason instanceof FetchError) {
        console.error(reason);
      } else {
        console.error("An unexpected error happened:", reason);
      }
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={3}
    >
      {donationSettings && (
        <Grid item xs={12}>
          <DonationSettingsForm
            donationSettings={donationSettings}
            handleSubmit={handleSubmit}
          />
        </Grid>
      )}
      {walletSettings && (
        <Grid item xs={12}>
          <WalletSettingsForm
            walletSettings={walletSettings}
            handleSubmit={handleSubmit}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Settings;
