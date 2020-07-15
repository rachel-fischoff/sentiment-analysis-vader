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
      selected: "#834bff",
      hover: "#834bff",
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
    MuiOutlinedInput: {
      input: {
        "&:-webkit-autofill": {
          WebkitBoxShadow: '0 0 0 100px #303030 inset',
          WebkitTextFillColor: '#fff' ,
        },
      },
    },
  },
});

export default theme;
