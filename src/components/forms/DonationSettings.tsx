import { FC } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Donation_settings } from "@prisma/client";
import { Chip, Paper } from "@mui/material";

interface ISettingsForm {
  donationSettings: IDonationSettings;
  handleSubmit: any;
}

interface IDonationSettings {
  secondPrice: Donation_settings["secondPrice"];
  charPrice: Donation_settings["charPrice"];
  charLimit: Donation_settings["charLimit"];
  minAmount: Donation_settings["minAmount"];
  gifsMinAmount: Donation_settings["gifsMinAmount"];
  goal: Donation_settings["goal"];
}

const DonationSettingsForm: FC<ISettingsForm> = ({
  donationSettings,
  handleSubmit,
}) => {
  const { secondPrice, charPrice, charLimit, minAmount, gifsMinAmount, goal } =
    donationSettings;
  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Typography component="h2" variant="h4" align="center" gutterBottom>
        Donation Settings
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
          <Chip label={`${secondPrice} XMR`} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="secondPrice"
            name="secondPrice"
            label="XMR price per second of showtime"
            placeholder={secondPrice}
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={2} align="center">
          <Chip label={`${charPrice} XMR`} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="charPrice"
            name="charPrice"
            label="XMR price per character"
            placeholder={charPrice}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} align="center">
          <Chip label={`${charLimit} characters max`} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="charLimit"
            name="charLimit"
            label="The maximum amount of characters per message"
            placeholder={charLimit}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} align="center">
          <Chip label={`${minAmount} XMR`} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="minAmount"
            name="minAmount"
            label="Minimum XMR amount for donation"
            placeholder={minAmount}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} align="center">
          <Chip label={`${gifsMinAmount} XMR`} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="gifsMinAmount"
            name="gifsMinAmount"
            label="Minimum XMR amount for sending GIFs"
            placeholder={gifsMinAmount}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={2} align="center">
          <Chip label={`${goal} XMR`} />
        </Grid>
        <Grid item xs={10}>
          <TextField
            id="goal"
            name="goal"
            label="Funding goal"
            placeholder={goal}
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
export default DonationSettingsForm;
