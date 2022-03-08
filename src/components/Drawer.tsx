import * as React from 'react';
import { useRouter } from "next/router"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
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
