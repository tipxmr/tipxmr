import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#654321",
    },
    secondary: {
      main: "#edf2ff",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
