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
  progressAtom,
  syncEndHeightAtom,
  syncHeightAtom,
  syncStartHeightAtom,
} from "~/store";

interface TipxmrWalletProps {
  /* handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void */
}
const TipxmrWallet: FC<TipxmrWalletProps> = () => {
  const [balance] = useAtom(balanceAtom);
  const [isSyncing] = useAtom(isSyncRunningAtom);
  const [height] = useAtom(syncHeightAtom);
  const [percentDone] = useAtom(progressAtom);
  const [startHeight] = useAtom(syncStartHeightAtom);
  const [endHeight] = useAtom(syncEndHeightAtom);

  // TODO handle the withdraw to address from db
  const handleWithdraw = () => console.log("Here should be a wallet call");

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
            Balance: {balance} XMR
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
