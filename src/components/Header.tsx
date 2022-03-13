import { FC, MouseEvent, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../img/logo.png";
import Image from "next/image";
import Link from "next/link";
import fetchJson from "~/lib/fetchJson";
import { User } from "~/pages/api/user";
import useUser from "~/lib/useUser";

let pages: { page: string; href: string }[];

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const ResponsiveAppBar: FC = () => {
  const { user: session, mutateUser } = useUser();

  useEffect(() => {
    if (!session?.isLoggedIn) {
      pages = [
        { page: "Overview", href: "/overview" },
        { page: "Dashboard", href: "/dashboard" },
        { page: "Donate", href: "/donate" },
        { page: "Register", href: "/register" },
        { page: "Login", href: "/login" },
      ];
    } else {
      pages = [
        { page: "Overview", href: "/overview" },
        { page: "Dashboard", href: "/dashboard" },
        { page: "Donate", href: "/donate" },
      ];
    }
  }, [session]);

  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(false);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(!!event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(!!event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  async function signOut() {
    const user = await fetchJson<User>("/api/logout", { method: "POST" });
    mutateUser(user, false);
  }

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box display="flex" alignItems="center">
              <Box mx={8} sx={{ cursor: "pointer" }}>
                <Link href="/" passHref>
                  <Image
                    src={Logo}
                    alt="Logo"
                    objectFit="contain"
                    width={200}
                    height={50}
                  />
                </Link>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages?.map(({ page, href }) => (
                  <Link href={href} passHref key={page}>
                    <MenuItem key={page}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages?.map(({ page, href }) => (
                <Link href={href} passHref key={page}>
                  <Button
                    key={page}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            {session?.isLoggedIn && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Ködi" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem key="logout" onClick={() => signOut()}>
                    <Typography textAlign="center">logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default ResponsiveAppBar;
