/* import landingIcon from "../images/landing-screen.svg"; */

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import HorizontalCenter from "~/components/helper/HorizontalCenter";

const Landing = () => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={6}>
        {/* <img src={landingIcon} alt="Logo" /> */}
        <HorizontalCenter>
          <img src="https://via.placeholder.com/150" alt="Landing" />
        </HorizontalCenter>
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
