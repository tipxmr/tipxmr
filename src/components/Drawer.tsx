import Divider from "@mui/material/Divider";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Drawer from "@mui/material/Drawer";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const drawerWidth = 240;
export default function PermanentDrawerLeft() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        alignSelf: "strech",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          position: "relative",
          top: "inherit",
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Divider />
      <List>
        <Link href="/dashboard" key="1" passHref>
          <ListItem button key="Dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link href="/dashboard/wallet" key="2" passHref>
          <ListItem button key="Wallet">
            <ListItemIcon>
              <AccountBalanceIcon />
            </ListItemIcon>
            <ListItemText primary="Wallet" />
          </ListItem>
        </Link>
        <Link href="/dashboard/settings" key="3" passHref>
          <ListItem button key="Settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
        <Link href="/dashboard/profile" key="4" passHref>
          <ListItem button key="Profile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
        </Link>
        <Link href="/dashboard/history" key="5" passHref>
          <ListItem button key="History">
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Drawer>
  );
}
