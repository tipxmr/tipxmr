import { FC, FormEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Wallet } from "@prisma/client";
import Chip from "@mui/material/Chip";
import PaperWrapper from "~/components/PaperWrapper";

interface SettingsFormProps {
  walletSettings: WalletSettingsProps;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

interface WalletSettingsProps {
  restoreHeight: Wallet["restoreHeight"];
  lastSyncHeight: Wallet["lastSyncHeight"];
}

const WalletSettingsForm: FC<SettingsFormProps> = ({
  walletSettings,
  handleSubmit,
}) => {
  const [restoreHeight, setRestoreHeight] = useState<Wallet["restoreHeight"]>();

  useEffect(() => {
    setRestoreHeight(walletSettings.restoreHeight);
  }, [walletSettings.restoreHeight, setRestoreHeight]);

  return (
    <PaperWrapper title="Wallet settings">
      <Grid
        container
        component="form"
        onSubmit={handleSubmit}
        spacing={3}
        justifyContent="center"
        direction="row"
        alignItems="center"
      >
        <Grid item xs={5}>
          <Chip
            label={`${String(walletSettings.restoreHeight)} blocks`}
            sx={{ display: "flex" }}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="restoreHeight"
            name="restoreHeight"
            label="What height should your wallet restore from?"
            placeholder={String(restoreHeight)}
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
    </PaperWrapper>
  );
};
export default WalletSettingsForm;
