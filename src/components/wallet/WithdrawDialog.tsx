import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { NumberInput } from "~/components";
interface IWithdrawDialog {
  address: string;
  handleWithdraw: () => void;
}
const WithdrawDialog: FC<IWithdrawDialog> = ({ address, handleWithdraw }) => {
  return (
    <Button variant="contained" onClick={handleWithdraw}>
      Withdraw everything
    </Button>
  );
};

export default WithdrawDialog;
