import { FC, FormEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import {
  Container,
  TextField,
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  FormControlLabel,
  Checkbox,
  Button,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import TipxmrLogo from "~/img/logo.png";
import { LanguageSelector, PaperWrapper } from "~/components";
import { LoadingButton } from "@mui/lab";
import SeedOutput from "../SeedOutput";
import Success from "./Success";
import Creation from "./Creation";
import RegistrationInfo from "./RegistrationInfo";

interface IRegister {
  seedLang: string;
  setSeedLang: Dispatch<SetStateAction<string>>;
  seedPhrase: string;
  setSeedPhrase: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
const steps = ["This is TipXMR", "Account creation", "Success"];

function getStepContent(step: number, seedLang?: string) {
  switch (step) {
    case 0:
      return <RegistrationInfo />;
    case 1:
      return <Creation />;
    case 2:
      return <Success />;
    default:
      throw new Error("Unknown step");
  }
}

const Register: FC<IRegister> = ({
  seedLang,
  setSeedLang,
  seedPhrase,
  setSeedPhrase,
  handleSubmit,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const boxStyles = {
    /* marginTop: 8, */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  // TODO implement the color scheme here on the avatars. Also DRY
  return (
    <Container maxWidth="md">
      <PaperWrapper>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Success />
        ) : (
          <>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </Button>
            </Box>
          </>
        )}
        <Box sx={boxStyles} component="form" onSubmit={handleSubmit}>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Image src={TipxmrLogo} alt="TipXMR Logo" width={250} height={50} />
          </Box>
          <Typography component="h1" variant="h5" align="center" mt={2}>
            Register
          </Typography>

          <Grid item xs={12} my={2}>
            <FormControlLabel
              control={<Checkbox required name="understood" />}
              label={
                <Typography variant="subtitle2">
                  I understand that I am responsible for my own security. TipXMR
                  is not liable.
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Create wallet and continue
            </Button>
          </Grid>
        </Box>
      </PaperWrapper>
    </Container>
  );
};

export default Register;
