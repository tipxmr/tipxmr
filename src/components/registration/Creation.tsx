import CreateIcon from "@mui/icons-material/Create";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { seedLangAtom, seedPhraseAtom } from "~/lib/atoms";
import { useAtom } from "jotai";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { LanguageSelector, SeedOutput } from "~/components";

interface ICreation {}

const Creation: FC<ICreation> = ({}) => {
  const [seedLang, setSeedLang] = useAtom(seedLangAtom);
  const [seedPhrase, setSeedPhrase] = useAtom(seedPhraseAtom);
  const boxStyles = {
    /* marginTop: 8, */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <Grid container spacing={2} mt={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TextField
            id="name"
            name="name"
            required
            helperText="This name will not be visible to your audience"
            label="Username"
            autoFocus
          />
          <TextField
            id="alias"
            name="alias"
            required
            helperText="This is the name your audience will see"
            label="Displayname"
            autoFocus
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} mt={3}>
        <Box sx={boxStyles}>
          <LanguageSelector
            language={String(seedLang)}
            handleChange={setSeedLang}
          />
        </Box>
        {seedPhrase ? (
          <SeedOutput seedPhrase={seedPhrase} />
        ) : (
          <LoadingButton
            loading
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Testing
          </LoadingButton>
        )}
      </Grid>
      <Grid item xs={12}>
        <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#ffee58" }}>
                <CreateIcon color="success" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Note down your seed phrase"
              secondary="You need to to sign into TipXMR"
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#8bc34a" }}>
                <LockIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Keep your seed secure"
              secondary="Don't lose it or show it to anybody. It is best kept offline."
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#8bc34a" }}>
                <AccountBalanceWalletIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="These words hold your money!"
              secondary="It is the ultimate backup to your sweet Moneroj"
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};

export default Creation;
