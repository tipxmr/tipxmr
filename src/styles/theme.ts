import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#123456",
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
