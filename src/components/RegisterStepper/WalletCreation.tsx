import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreateIcon from "@mui/icons-material/Create";
import LockIcon from "@mui/icons-material/Lock";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAtom } from "jotai";
import { FC, useTransition } from "react";

import LanguageSelector from "~/components/LanguageSelector";
import SeedOutput from "~/components/SeedOutput";
import { generatedSeedPhraseAtom, seedLangAtom } from "~/store";

const WalletCreation: FC = () => {
  const theme = useTheme();
  const [isPending, startTransition] = useTransition();
  const [seedLang, setSeedLang] = useAtom(seedLangAtom);
  const [seedPhrase] = useAtom(generatedSeedPhraseAtom);

  const handleSetSeedLang = (language: string) => {
    startTransition(() => {
      setSeedLang(language);
    });
  };

  return (
    <Grid container spacing={2} mt={3}>
      <Grid item xs={12} sm={12} mt={3}>
        <h3 className="text-center">You XMR wallet seedphrase</h3>
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
        <div className="mt-5 flex flex-col items-center">
          <LanguageSelector language={seedLang} onChange={handleSetSeedLang} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <List sx={{ width: "100%", mt: 4, bgcolor: "background.paper" }}>
          <ListItem>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
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
              <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
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
              <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
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
