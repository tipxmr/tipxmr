/* import landingIcon from "../images/landing-screen.svg"; */

import { Typography, Grid } from "@mui/material";
import { HorizontalCentering } from '../components/helper'

const Landing = () => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        {/* <img src={landingIcon} alt="Logo" /> */}
        <HorizontalCentering>
          <img src="https://via.placeholder.com/150" alt="Landing" />
        </HorizontalCentering>
      </Grid>
      <Grid item xs={6} sx={{ margin: "auto" }}>
        <Typography variant="h1" align="center">
          Monero Donations in your livestream
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Landing;
