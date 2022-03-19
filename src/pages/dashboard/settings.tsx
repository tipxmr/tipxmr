import { Typography, Input, Button, Container, Paper } from "@mui/material";
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
  /*
   *   useEffect(() => {
   *     setAccount(data?.account);
   *     setWallet(data?.wallet);
   *     setDonationSettings(data?.donationSettings);
   *   }, [data, setAccount, setWallet, setDonationSettings]);
   *  */
  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Your Settings
          </Typography>
          {donationSettings && (
            <>
              <DonationSettingsForm
                donationSettings={donationSettings}
                handleSubmit={handleSubmit}
              />
            </>
          )}
          {walletSettings && (
            <>
              <WalletSettingsForm
                walletSettings={walletSettings}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Settings;
