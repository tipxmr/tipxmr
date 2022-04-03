import CreateIcon from "@mui/icons-material/Create";
import LockIcon from "@mui/icons-material/Lock";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import { generatedSeedPhraseAtom, seedLangAtom, seedPhraseAtom } from "~/store";
import { useAtom } from "jotai";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
//@ts-ignore
import { FC, useTransition } from "react";
import { LanguageSelector, SeedOutput } from "~/components";
import Title from "../Title";

interface IWalletCreation {}

const WalletCreation: FC<IWalletCreation> = ({}) => {
  const [seedLang, setSeedLang] = useAtom(seedLangAtom);
  const [isPending, startTransition] = useTransition();
  const handleSetSeedLang = (language) => {
    startTransition(() => {
      setSeedLang(language);
    });
  };
  const [seedPhrase] = useAtom(generatedSeedPhraseAtom);
  console.log({ seedPhrase });
  const boxStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  return (
    <Grid container spacing={2} mt={3}>
      <Grid item xs={12} sm={12} mt={3}>
        <Title>You XMR wallet seedphrase</Title>
        {isPending ? (
          <LoadingButton
            loading
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Testing
          </LoadingButton>
        ) : (
          <SeedOutput seedPhrase={seedPhrase} />
        )}
        <Box sx={{ ...boxStyles, mt: 5 }}>
          <LanguageSelector
            language={String(seedLang)}
            onChange={handleSetSeedLang}
          />
        </Box>
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

export default WalletCreation;
