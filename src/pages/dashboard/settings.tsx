import { Typography, Input, Button, Container, Paper } from "@mui/material";
import { Account, Donation_settings, Wallet } from "@prisma/client";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { SettingsForm } from "~/components";
import fetchJson, { FetchError } from "~/lib/fetchJson";
import useUser from "~/lib/useUser";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });

  const [account, setAccount] = useState<Account>();
  const [wallet, setWallet] = useState<Wallet>();
  const [donationSettings, setDonationSettings] = useState<Donation_settings>();


  const { data, error } = useSWR(`/api/donation-settings/${user?.name}`)

  const handleSubmit = async () => {
    // TODO this works, but needs to be cleaned up and transformed to form
    const body = {
      charPrice: 12,
      charLimit: 9001,
      secondPrice: 420,
    };

    try {
      const result = await fetchJson("/api/streamer/settings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(result);
    } catch (reason) {
      if (reason instanceof FetchError) {
        console.error(reason);
      } else {
        console.error("An unexpected error happened:", reason);
      }
    }
  };

  useEffect(() => {
    setAccount(data?.account);
    setWallet(data?.wallet);
    setDonationSettings(data?.donationSettings);
  }, [data, setAccount, setWallet, setDonationSettings]);

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
              <SettingsForm donationSettings={donationSettings} handleSubmit={handleSubmit} />
            </>

          )}
        </Paper>
      </Container>
    </>
  );
};

export default Settings;
