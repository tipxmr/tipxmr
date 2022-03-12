import * as React from 'react';
import { useRouter } from "next/router"
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;
const pages = [
  { page: "Wallet", href: "/wallet" },
  { page: "Dashboard", href: "/dashboard" },
  { page: "Settings", href: "/settings" },
  { page: "History", href: "/history" },
  { page: "Profile", href: "/profile" },
];

export default function PermanentDrawerLeft() {
  const router = useRouter()
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        alignSelf: "strech",
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          position: "relative",
          top: "inherit",
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {pages.map((page, index) => (
          <ListItem button key={page.page} onClick={() => { router.push(page.href) }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={page.page} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
