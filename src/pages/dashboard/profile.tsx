import { List, ListItemText, Typography } from "@mui/material";
import { NextPage } from "next";
import useUser from "~/lib/useUser";
import { IsOnlineBadge, isOnlineBadge } from "~/components";

const Profile: NextPage = () => {
  // TODO create a profile with some of the stats from the db
  // Creation Date
  // username and display name
  // status
  const { user } = useUser({ redirectTo: "/login" });
  return (
    <>
      <Typography component="h1" variant="h2">
        Your TipXMR Profile
      </Typography>
      <List component="h2">
        <ListItemText
          primary={
            <Typography variant="subtitle1">
              Your unique Tipxmr ID: {user.id}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography variant="body1">Username: {user.name}</Typography>
          }
        />
        <ListItemText
          primary={<Typography variant="body1">Alias: {user.alias}</Typography>}
        />
        <ListItemText
          primary={
            <Typography variant="body1">
              Account created at: {user.createdAt}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography variant="body1">
              Last account update at: {user.updatedAt}
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography variant="body1">
              Current wallet status: <IsOnlineBadge isOnline={user.isOnline} />
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography variant="body1">
              Current logged-in status:{" "}
              <IsOnlineBadge isOnline={user.isLoggedIn} />
            </Typography>
          }
        />
        <ListItemText
          primary={
            <Typography variant="body1">
              Current Socket Connection: {user.socket}
            </Typography>
          }
        />
      </List>
    </>
  );
};

export default Profile;
