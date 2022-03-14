import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Link from "next/link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";

const drawerWidth = 240;
const pages = [
  { page: "Wallet", href: "/dashboard/wallet" },
  { page: "Dashboard", href: "/dashboard" },
  { page: "Settings", href: "/dashboard/settings" },
  { page: "History", href: "/dashboard/history" },
  { page: "Profile", href: "/dashboard/profile" },
];

export default function PermanentDrawerLeft() {
  const router = useRouter();
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
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {pages.map((page, index) => (
          <Link href={page.href} key={index} passHref>
            <ListItem button key={page.page}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={page.page} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
