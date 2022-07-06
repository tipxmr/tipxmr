import { FC } from "react";
import Typography from "@mui/material/Typography";
import PaperWrapper from "~/components/PaperWrapper";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import WithdrawDialog from "./WithdrawDialog";
import { useAtom } from "jotai";
import {
  balanceAtom,
  isSyncRunningAtom,
  lockedBalanceAtom,
  progressAtom,
  syncEndHeightAtom,
  syncHeightAtom,
  syncStartHeightAtom,
  walletAtom,
} from "~/store";
import { MoneroTxConfig, MoneroTxPriority } from "monero-javascript";

const TipxmrWallet: FC = () => {
  const [balance] = useAtom(balanceAtom);
  const [lockedBalance] = useAtom(lockedBalanceAtom);
  const [xmrWallet] = useAtom(walletAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [height] = useAtom(syncHeightAtom);
  const [percentDone] = useAtom(progressAtom);
  const [startHeight] = useAtom(syncStartHeightAtom);
  const [endHeight] = useAtom(syncEndHeightAtom);

  // TODO handle the withdraw to address from db
  const handleWithdraw = async () => {
    const txs = xmrWallet?.getTxs();
    console.info({ txs });
    const transaction = {
      address:
        "73a4nWuvkYoYoksGurDjKZQcZkmaxLaKbbeiKzHnMmqKivrCzq5Q2JtJG1UZNZFqLPbQ3MiXCk2Q5bdwdUNSr7X9QrPubkn",
      accountIndex: 0,
      subaddressIndex: 1,
      amount: 1n,
      relay: true,
      priority: MoneroTxPriority.UNIMPORTANT,
    } as MoneroTxConfig;

    console.log("tx is: ", transaction);

    const tx = xmrWallet?.createTx(transaction);
    console.log("Result of transaction", tx);
    return tx;
  };

  return (
    <PaperWrapper title="My wallet">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Typography component="p" variant="h4">
            Balance: {balance} XMR ({lockedBalance} XMR locked)
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={10}></Grid>
        <Grid item xs={12}>
          <Box
            sx={{ display: "flex", mb: 2 }}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Typography align="right">
              {height}/{endHeight}
            </Typography>
            <Chip
              label={`${percentDone}%`}
              color={isSyncing ? "success" : "info"}
            />
          </Box>
          <LinearProgress variant="determinate" value={percentDone} />
        </Grid>
        <Grid item xs={12}>
          <WithdrawDialog
            address={process.env.PRIMARY_TEST_ADDRESS}
            handleWithdraw={handleWithdraw}
          />
        </Grid>
      </Grid>
    </PaperWrapper>
  );
};
export default TipxmrWallet;
