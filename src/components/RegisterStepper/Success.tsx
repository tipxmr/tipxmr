import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import { FC, FormEvent } from "react";
import {
  displayNameAtom,
  truncatedHashedSeedAtom,
  userNameAtom,
} from "~/store";
import PaperWrapper from "../PaperWrapper";
import Title from "../Title";
import useCreateUser from "~/hooks/useCreateUser";

const Success: FC = () => {
  const [displayName] = useAtom(displayNameAtom);
  const [userName] = useAtom(userNameAtom);
  const [truncatedHashedSeed] = useAtom(truncatedHashedSeedAtom);

  const createUser = useCreateUser();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /* const name = data.get("name") as string;
     * const alias = data.get("alias") as string; */
    const name = userName;
    const alias = displayName;

    /*  const understood = data.get("understood");
    if (!understood) {
      // TODO validate this on the field
      alert("Sorry, you must agree to proceed");
      return;
    } */
    createUser.mutate({ id: truncatedHashedSeed, name, alias });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12}>
          <Title>Confirm your Account creation</Title>
        </Grid>
        <Grid item xs={12}>
          <PaperWrapper>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
                <ListItemText primary={`${userName}`} secondary="Username" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`${displayName}`}
                  secondary="Display Name"
                />
              </ListItem>
            </List>
          </PaperWrapper>
        </Grid>
      </Grid>
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
              //onChange={handleAccountAgree}
            />
          }
          label={
            <Typography variant="subtitle2">
              I understand that I am responsible for my own security. TipXMR is
              not liable.
            </Typography>
          }
        />
        <Button variant="contained" color="primary" type="submit">
          Create wallet and continue
        </Button>
      </Box>
    </form>
  );
};

export default Success;
