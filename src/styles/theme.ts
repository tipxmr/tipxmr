import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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
});

export default theme;
