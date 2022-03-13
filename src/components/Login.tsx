import { FC, FormEvent } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TipxmrLogo from "~/img/logo.png";

interface ILogin {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Login: FC<ILogin> = ({ handleSubmit }) => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper elevation={2} sx={{ p: 4 }}>
          <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Image src={TipxmrLogo} alt="TipXMR Logo" width={250} height={50} />
          </Box>
          <Typography component="h1" variant="h5" align="center" mt={2}>
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="seed"
              label="XMR seed"
              name="seed"
              rows={4}
              multiline
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox required name="understood" color="primary" />}
              label="I understand that I am responsible for my own security and TipXMR has no liability"
            />
            <FormControlLabel
              control={<Checkbox name="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Let&apos;s go!
            </Button>
            <Grid container justifyContent="right">
              <Grid item>
                <Link href="/register">Don&apos;t have an account yet?</Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
export default Login;
