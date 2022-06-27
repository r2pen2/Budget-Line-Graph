import { createTheme } from "@mui/material/styles";

export default createTheme({
  // declare re-used variables
  palette: {
    type: "dark",
    background: {
      main: "#23232e",
    },
    primary: {
      main: "#6649b8",
    },
    secondary: {
      main: "#b8499a",
    },
    textPrimary: {
        main: "#b6b6b6",
    },
    textSecondary: {
        main: "#ececec",
    },
    bgPrimary: {
        main: "#23232e",
    },
    bgSecondary: {
        main: "#141418",
    },
    frozenBlue: {
      main: 'rgba(0, 225, 255, 0.5)'
    },
    inputYellow: {
      main: 'rgb(255, 254, 199)'
    }
  },
});
