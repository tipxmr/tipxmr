import { Grid, List, ListItem, ListItemText } from "@mui/material";
import { useAtom } from "jotai";
import { FC } from "react";

import { displayNameAtom, userNameAtom } from "~/store";

import PaperWrapper from "../PaperWrapper";
import Title from "../Title";

const Success: FC = () => {
  const [displayName] = useAtom(displayNameAtom);
  const [userName] = useAtom(userNameAtom);

  return (
    <Grid container spacing={2} mt={3}>
      <Grid item xs={12}>
        <h3 className="text-center">Confirm your Account creation</h3>
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
  );
};

export default Success;
