import { Container, Typography } from "@mui/material";
import { FC } from "react";

interface HeroUnitProps {
  title: string;
  text: string;
}

const HeroUnit: FC<HeroUnitProps> = ({ title, text }) => {
  return (
    <Container
      disableGutters
      maxWidth="sm"
      component="main"
      sx={{ pt: 8, pb: 6 }}
    >
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        component="p"
      >
        {text}
      </Typography>
    </Container>
  );
};

export default HeroUnit;
