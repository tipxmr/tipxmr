import { FC, FormEvent, useState } from "react";
import Image from "next/image";
import {
  Container,
  Box,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Stepper,
  StepLabel,
  Step,
} from "@mui/material";
import TipxmrLogo from "~/img/logo.png";
import { PaperWrapper } from "~/components";
import Success from "./Success";
import WalletCreation from "./WalletCreation";
import AccountCreation from "./AccountCreation";
import RegistrationInfo from "./RegistrationInfo";

interface IRegister {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
const steps = [
  "This is TipXMR",
  "Wallet creation",
  "Account creation",
  "Success",
];

function getStepContent(step: number, seedLang?: string) {
  switch (step) {
    case 0:
      return <RegistrationInfo />;
    case 1:
      return <WalletCreation />;
    case 2:
      return <AccountCreation />;
    case 3:
      return <Success />;
    default:
      throw new Error("Unknown step");
  }
}

const Register: FC<IRegister> = ({ handleSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [infoUnderstood, setInfoUnderstood] = useState(false);
  const [accountUnderstood, setAccountUnderstood] = useState(false);
  const [seedWritten, setSeedWritten] = useState(false);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleInfoAgree = () => {
    setInfoUnderstood(!infoUnderstood);
  };
  const handleAccountAgree = () => {
    setAccountUnderstood(!accountUnderstood);
  };
  const handleSeedWritten = () => {
    setSeedWritten(!seedWritten);
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
      <Box sx={boxStyles} component="form" onSubmit={handleSubmit}>
        <PaperWrapper>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Image src={TipxmrLogo} alt="TipXMR Logo" width={250} height={50} />
          </Box>

          <Typography component="h1" variant="h5" align="center" mt={2}>
            Register
          </Typography>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {activeStep >= 1 && (
              <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                Back
              </Button>
            )}
            {activeStep == 0 && (
              <Button
                disabled={activeStep == 0 && !infoUnderstood}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                Next
              </Button>
            )}

            {activeStep == 1 && (
              <Button
                disabled={activeStep == 1 && !seedWritten}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                Next
              </Button>
            )}
            {activeStep == 2 && (
              <Button
                disabled={activeStep == 2 && !accountUnderstood}
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                Next
              </Button>
            )}
          </Box>

          {getStepContent(activeStep)}

          {activeStep === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Checkbox
                required
                onChange={handleInfoAgree}
                value={infoUnderstood}
              />
              <Typography variant="button" component="body">
                I have read the above disclaimer.
              </Typography>
            </Box>
          )}

          {activeStep === 1 && (
            /* (<Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "left" }}> */
            <Grid container justifyContent="center" mt={3}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "left",
                }}
              >
                <Checkbox
                  required
                  name="seedWritten"
                  onChange={handleSeedWritten}
                  value={seedWritten}
                />
                <Typography variant="button" component="body">
                  I have written down my seed phrase. I understand that I am
                  responsible for my own security. TipXMR is not liable.
                </Typography>
              </Grid>
            </Grid>
          )}

          {activeStep === 2 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Checkbox
                required
                onChange={handleAccountAgree}
                value={accountUnderstood}
              />
              <Typography variant="button" component="body">
                I want to sign up to TipXMR.
              </Typography>
            </Box>
          )}

          {activeStep === 3 && (
            <Box
              mt={3}
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    required
                    name="understood"
                    onChange={handleAccountAgree}
                  />
                }
                label={
                  <Typography variant="subtitle2">
                    I understand that I am responsible for my own security.
                    TipXMR is not liable.
                  </Typography>
                }
              />
              <Button variant="contained" color="primary" type="submit">
                Create wallet and continue
              </Button>
            </Box>
          )}
        </PaperWrapper>
      </Box>
    </Container>
  );
};

export default Register;
