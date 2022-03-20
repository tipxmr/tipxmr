import { FC } from "react";
import Typography from "@mui/material/Typography";
import { PaperWrapper } from "~/components";
import { Box, Chip, Grid, LinearProgress } from "@mui/material";
import WithdrawDialog from "./WithdrawDialog";

interface ITipxmrWallet {
  balance: number;
  isSynced: boolean;
  height: number;
  percentDone: number;
  startHeight: number;
  endHeight: number;
  /* handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void */
}
const TipxmrWallet: FC<ITipxmrWallet> = ({
  balance,
  isSynced,
  height,
  percentDone,
  startHeight,
  endHeight,
}) => {
  // TODO handle the withdraw to address from db
  const handleWithdraw = () => console.log("Here should be a wallet call");
  const address =
    "53N5yFyay3uXvLepuRT8SG2KLijz1vHTnQ71y1CCBjxw3vEZysjmAMq3FjM3EFwXEUawDbrQAEmJgEnGVBiDP3HXFXVmxcS";

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
            <Chip label={`${percentDone}%`} />
          </Box>
          <LinearProgress variant="determinate" value={percentDone} />
        </Grid>
        <Grid item xs={12}>
          <WithdrawDialog address={address} handleWithdraw={handleWithdraw} />
        </Grid>
      </Grid>
    </PaperWrapper>
  );
};
export default TipxmrWallet;
