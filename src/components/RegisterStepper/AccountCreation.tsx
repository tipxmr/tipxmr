import { Box, Grid, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { toLower } from "ramda";
import { ChangeEvent, FC } from "react";

import { displayNameAtom, userNameAtom } from "~/store";

import InfoCard from "../InfoCard";
import Title from "../Title";

const AccountCreation: FC = () => {
  const [userName, setUserName] = useAtom(userNameAtom);
  const [_, setDisplayName] = useAtom(displayNameAtom);

  const userNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = toLower(e.target.value);
    setUserName(text);
  };
  const displayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = toLower(e.target.value);
    setDisplayName(text);
  };

  return (
    <Grid container spacing={2} mt={3}>
      <Grid item xs={12}>
        <h3 className="text-center">Create your TipXMR account</h3>
      </Grid>
      <Grid item xs={12}>
        <InfoCard
          title="Set up your TipXMR account"
          subtitle="Almost there"
          bodyText="Choose a username and displayname for your account. The username is used in your personal donation url. The displayname can be more fun.. with 😀 emojis."
        />
      </Grid>
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
            onChange={userNameChange}
            required
            helperText={`Your URL ${process.env.PLATFORM_URL}/donate/${userName}`}
            label="Username"
            autoFocus
          />
          <TextField
            id="alias"
            name="alias"
            onChange={displayNameChange}
            required
            helperText="This is the name your audience will see"
            label="Displayname"
            autoFocus
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AccountCreation;
