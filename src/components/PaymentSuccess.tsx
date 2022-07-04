import { Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { FC } from "react";

interface PaymentSuccessProps {
  amount: number;
  address: string;
}

const PaymentSuccess: FC<PaymentSuccessProps> = ({ amount, address }) => {
  return (
    <Paper elevation={3} sx={{ p: 8 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <CheckCircleIcon fontSize="large" color="success" />
        </Grid>
        <Grid item>
          <Typography component="h2" variant="h2">
            Payment successful
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="p" variant="subtitle1">
            Sent {amount} XMR to {address}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PaymentSuccess;
