import { Typography } from "@mui/material";
import { Account, Donation_settings, Wallet } from "@prisma/client";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import useSWR from "swr";
import useUser from "~/lib/useUser";

const Settings: NextPage = () => {
  const { user } = useUser({ redirectTo: "/login" });

  const [account, setAccount] = useState<Account>();
  const [wallet, setWallet] = useState<Wallet>();
  const [donationSettings, setDonationSettings] = useState<Donation_settings>();

  const { data, error } = useSWR("/api/streamer/settings");
  if (error) return <>"Sorry there was an error"</>;

  useEffect(() => {
    setAccount(data?.account);
    setWallet(data?.wallet);
    setDonationSettings(data?.donationSettings);
  }, [data, setAccount, setWallet, setDonationSettings]);

  console.log(data);
  console.log(donationSettings);
  return (
    <>
      <Typography component="h1">Your Settings</Typography>

      {account && (
        <>
          <Typography component="h2">Account</Typography>
          <Typography component="li">
            Creation Date: {account.createdAt}
          </Typography>
          <Typography component="li">
            Online Status: {account.isOnline}
          </Typography>
          <Typography component="li">
            Active Status: {account.status}
          </Typography>
        </>
      )}
      <Typography component="li">Stream</Typography>

      {donationSettings && (
        <>
          <Typography component="li">
            Char Price: {donationSettings.charPrice} XMR
          </Typography>
          <Typography component="li">
            Char Limit: {donationSettings.charLimit}
          </Typography>
        </>
      )}

      {wallet && (
        <>
          <Typography component="li">
            Restore Height: {wallet.restoreHeight}
          </Typography>
          <Typography component="li">
            Sync Height: {wallet.lastSyncHeight}
          </Typography>
        </>
      )}

      <Typography component="li">Donation Settings</Typography>

      {user && user.id}
      {account && account.createdAt}
    </>
  );
};

export default Settings;
