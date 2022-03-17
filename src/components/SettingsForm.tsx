import { FC } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Donation_settings } from "@prisma/client";
import { secondPrice, charPrice, charLimit, minAmount, gifsMinAmount, goal } from "~/lib/atoms"

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

const SettingsForm: FC<ISettingsForm> = ({ handleSubmit }) => {
    return (
        <>
            <Typography variant="h6" gutterBottom>
                Donation Settings
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="secondPrice"
                        name="secondPrice"
                        label="XMR price per second of showtime"
                        placeholder={secondPrice}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="charPrice"
                        name="charPrice"
                        label="XMR price per character"
                        placeholder={charPrice}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="charLimit"
                        name="charLimit"
                        label="The maximum amount of characters per message"
                        placeholder={charLimit}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="minAmount"
                        name="minAmount"
                        label="Minimum XMR amount for donation"
                        placeholder={minAmount}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="gifsMinAmount"
                        name="gifsMinAmount"
                        label="Minimum XMR amount for sending GIFs"
                        placeholder={gifsMinAmount}
                        fullWidth
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                    <Button fullWidth onClick={handleSubmit}>Save settings</Button>
                </Grid>
            </Grid>
        </>
    );
};
export default SettingsForm;
