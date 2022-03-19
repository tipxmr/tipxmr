import { FC } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Wallet } from "@prisma/client";

interface ISettingsForm {
  walletSettings: IWalletSettings;
  handleSubmit: any;
}

interface IWalletSettings {
  restoreHeight: Wallet["restoreHeight"];
  lastSyncHeight: Wallet["lastSyncHeight"];
}

const WalletSettingsForm: FC<ISettingsForm> = ({
  walletSettings,
  handleSubmit,
}) => {
  const { restoreHeight } = walletSettings;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Donation Settings
      </Typography>
      <Grid container component="form" onSubmit={handleSubmit} spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="restoreHeight"
            name="restoreHeight"
            label="What height should your wallet restore from?"
            placeholder={restoreHeight}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth type="submit" color="primary">
            Save settings
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default WalletSettingsForm;
