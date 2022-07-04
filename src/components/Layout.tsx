import { ReactNode, FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import Drawer from "~/components/Drawer";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import useUser from "~/lib/useUser";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { user: session } = useUser();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Header />

      <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
        {session?.isLoggedIn && <Drawer />}
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
