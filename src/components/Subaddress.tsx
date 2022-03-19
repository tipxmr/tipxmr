import { Paper, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { FC } from "react";

interface ISubaddress {
  address: string;
}

const Subaddress: FC<ISubaddress> = ({ address }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <AccountBalanceWalletIcon
        fontSize="large"
        color="success"
        sx={{ mr: 3 }}
      />
      <Typography component="p" variant="h6">
        {address}
      </Typography>
    </Paper>
  );
};

export default Subaddress;
