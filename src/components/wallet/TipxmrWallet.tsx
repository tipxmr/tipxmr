import { FC, useState } from "react";
import { Grid, Snackbar } from "@mui/material";
import WithdrawDialog from "./WithdrawDialog";
import SyncProgress from "./SyncProgress";
import WalletBalance from "./BalanceChip";

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
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      sx={{ width: "80%", border: "1px dashed lightgrey" }}
      container
      spacing={3}
    >
      <Grid item xs={3}>
        <WalletBalance />
      </Grid>

      <Grid item xs={5}>
        <SyncProgress />
      </Grid>
      <Grid item xs={3} justifySelf="center">
        <WithdrawDialog handleWithdraw={handleClick} address="fixme" />
        <Snackbar
          open={open}
          onClose={handleClose}
          message="👷 Still under development"
        />
      </Grid>
    </Grid>
  );
};
export default TipxmrWallet;
