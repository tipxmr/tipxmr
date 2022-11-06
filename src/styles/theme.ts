import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "@next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

declare module "@mui/material/styles" {
  interface Theme {
    drawerWidth: number;
    background: string;
    boxStyles: {
      display: string;
      flexDirection: string;
      alignItems: string;
    };
  }
  interface ThemeOptions {
    drawerWidth?: number;
    background?: string;
    boxStyles?: {
      display?: string;
      flexDirection?: string;
      alignItems?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFAF7A",
    },
    secondary: {
      main: "#edf2ff",
    },
    error: {
      main: red.A400,
    },
  },
  drawerWidth: 240,
  background: "#ffee58",
  boxStyles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
