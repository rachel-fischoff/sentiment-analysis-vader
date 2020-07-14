import { createMuiTheme } from "@material-ui/core/styles";
import "typeface-roboto-mono";
require("typeface-roboto-mono");

const theme = createMuiTheme({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  palette: {
    primary: {
      main: "#834bff",
    },
    secondary: {
      main: "#651fff",
    },
    type: "dark",

    action: {
      hover: "#651fff",
      selected: "#651fff",
    },
  },

  typography: {
    fontFamily: "Roboto Mono",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": "Roboto Mono",
      },
    },
    MuiTypography: {
      root: {
        fontFamily: "Roboto Mono",
      },
    },
    MuiIconButton: {
      label: {
        fontFamily: "Roboto Mono",
      },
    },
    MuiChip: {
      label: {
        color: "#303030",
      },
    },
  },
});

export default theme;
