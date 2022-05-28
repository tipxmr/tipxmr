import { io } from "socket.io-client";
import IsOnlineBadge from "~/components/IsOnlineBadge";
import { useEffect } from "react";
import Container from "@mui/material/Container";
import Head from "next/head";
import type { NextPage } from "next";
import Typography from "@mui/material/Typography";
import useUser from "~/lib/useUser";
import { useAtom } from "jotai";
import {
  balanceAtom,
  generatedSeedPhraseAtom,
  isSyncRunningAtom,
  progressAtom,
  syncEndHeightAtom,
  syncHeightAtom,
  walletAtom,
} from "~/store";
import { createSyncProgressListener, open } from "~/lib/xmr";

function useSocket() {
  useEffect(() => {
    const socket = io("http://localhost:3000/streamer", {
      path: "/ws",
    });

    socket.on("connect_error", (reason) => {
      console.error(reason.message);
    });

    socket.on("connect", () => {
      console.log("connected");
      socket.emit("streamer:online", socket.id);
    });

    socket.on("disconnect", () => {
      socket.emit("streamer:offline");
    });

    return () => {
      console.log("disconnect");
      socket.emit("streamer:offline");
      socket.disconnect();
    };
  }, []);

  return;
}

const Home: NextPage = () => {
  const { user: session } = useUser({ redirectTo: "/login" });
  const [seedPhrase] = useAtom(generatedSeedPhraseAtom);
  const [progress, setProgress] = useAtom(progressAtom);
  const [myWallet, setMyWallet] = useAtom(walletAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [syncHeight, setSyncHeight] = useAtom(syncHeightAtom);
  const [balance] = useAtom(balanceAtom);

  /* useEffect(() => {
*   const listener = createSyncProgressListener(
*     (height, startHeight, endHeight, percentDone, message: string) => {
*       const percentage = Math.floor(percentDone * 100);
*       setProgress(percentage);
*       setSyncHeight(height);
*     }
*   );

*   async function foobar() {
*     const wallet = await open(seedPhrase);
*     // setXmrWallet(wallet);
*     setMyWallet(wallet);
*     const primaryAddress = await wallet.getPrimaryAddress();

*     await wallet.addListener(listener);
*     await wallet.setSyncHeight(1063600);
*     await wallet.startSyncing();

*     console.log({ primaryAddress });

*     return () => {
*       wallet.stopSyncing();
*     };
*   }

*   const unsubscribe = foobar();

*   return () => {
*     // unsubscribe();
*   };
* }, []);
 */
  if (session && session.isLoggedIn) {
    return (
      <Container>
        <Head>
          <title>Dashboard</title>
        </Head>

        <>
          <Typography variant="h4">Welcome, {session.alias}</Typography>
          <Typography variant="h5">Your ID: {session.id}</Typography>
          <IsOnlineBadge isOnline={!!session?.isOnline} />
        </>
      </Container>
    );
  }
  return <Typography variant="h2">Please log in</Typography>;
};

export default Home;
