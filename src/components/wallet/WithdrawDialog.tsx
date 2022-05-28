import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import NumberInput from "~/components/NumberInput";
interface WithdrawDialogProps {
  address?: string;
  handleWithdraw: () => void;
}
const WithdrawDialog: FC<WithdrawDialogProps> = ({
  address,
  handleWithdraw,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Typography component="h3" variant="h4">
            Withdraw from wallet
          </Typography>
        </Grid>

        <Grid item>
          <NumberInput label="Withdraw amount" />
        </Grid>
        <Grid item>
          <Typography component="p" variant="body1" align="center">
            Recipient address:
          </Typography>
          <Typography component="p" variant="caption" align="center">
            {address}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WithdrawDialog;
