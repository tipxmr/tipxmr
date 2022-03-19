import { FC } from "react";
import Typography from "@mui/material/Typography";
import Title from "~/components/Title";
import { Box, Chip, Grid, LinearProgress, Paper } from "@mui/material";
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
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12}>
          <Title>My Wallet</Title>
        </Grid>
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
          <WithdrawDialog />
        </Grid>
      </Grid>
    </Paper>
  );
};
export default TipxmrWallet;
