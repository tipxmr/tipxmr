import { ReactNode, FC } from "react"
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/material";
import { Drawer, Header, Footer } from "~/components"
import useUser from "~/lib/useUser"

interface ILayout {
  children: ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
  const { user: session, mutateUser } = useUser()
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

      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
        {session?.isLoggedIn ? <Drawer /> : ""}
        {children}
      </Container>

      <Footer />
    </Box>
  );
}

export default Layout;
