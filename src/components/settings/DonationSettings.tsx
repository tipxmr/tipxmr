import { FC } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Donation_settings } from "@prisma/client";
import { Chip } from "@mui/material";
import { PaperWrapper } from "~/components";

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
    <PaperWrapper title="Donation Settings">
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
          <Chip label={`${secondPrice} XMR`} sx={{ display: "flex" }} />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="secondPrice"
            name="secondPrice"
            label="XMR price per second of showtime"
            placeholder={String(secondPrice)}
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={5}>
          <Chip label={`${charPrice} XMR`} sx={{ display: "flex" }} />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="charPrice"
            name="charPrice"
            label="XMR price per character"
            placeholder={String(charPrice)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={5}>
          <Chip
            label={`${charLimit} characters max`}
            sx={{ display: "flex" }}
          />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="charLimit"
            name="charLimit"
            label="The maximum amount of characters per message"
            placeholder={String(charLimit)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={5}>
          <Chip label={`${minAmount} XMR`} sx={{ display: "flex" }} />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="minAmount"
            name="minAmount"
            label="Minimum XMR amount for donation"
            placeholder={String(minAmount)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={5}>
          <Chip label={`${gifsMinAmount} XMR`} sx={{ display: "flex" }} />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="gifsMinAmount"
            name="gifsMinAmount"
            label="Minimum XMR amount for sending GIFs"
            placeholder={String(gifsMinAmount)}
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={5}>
          <Chip label={`${goal} XMR`} sx={{ display: "flex" }} />
        </Grid>
        <Grid item xs={7}>
          <TextField
            id="goal"
            name="goal"
            label="Funding goal"
            placeholder={String(goal)}
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
export default DonationSettingsForm;
