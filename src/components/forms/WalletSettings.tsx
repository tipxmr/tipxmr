import { FC, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Wallet } from "@prisma/client";
import Chip from "@mui/material/Chip";
import { Paper } from "@mui/material";

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
  console.log(walletSettings.wallet);
  const { restoreHeight: test } = walletSettings;
  console.log(test);
  const [restoreHeight, setRestoreHeight] = useState<Wallet["restoreHeight"]>();

  useEffect(() => {
    const { restoreHeight } = walletSettings;
    setRestoreHeight(restoreHeight);
  }, [walletSettings, restoreHeight, setRestoreHeight]);

  console.log("restoreHeight ", restoreHeight);
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography component="h2" variant="h4" align="center" gutterBottom>
        Wallet Settings
      </Typography>
      <Grid
        container
        component="form"
        onSubmit={handleSubmit}
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2} align="center">
          <Chip label={`${String(walletSettings.restoreHeight)} blocks`} />
        </Grid>
        <Grid item xs={10}>
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
    </Paper>
  );
};
export default WalletSettingsForm;
