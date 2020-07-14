import { createMuiTheme } from "@material-ui/core/styles";
import RobotoMono from "typeface-roboto-mono";
import NotoSans from "typeface-noto-sans-full";

const theme = createMuiTheme({
  root: {
    flexGrow: 1,
    display: "flex",
  },
  palette: {
    primary: {
      light: "#000",
      main: "#000",
      dark: "#000",
      contrastText: "#18ffff",
    },
    secondary: {
      light: "#ff00a9",
      main: "#ff00a9",
      dark: "#ff00a9",
      contrastText: "#fff",
    },
    // type: "dark",
    background: {
      paper: "#000",
      default: "#000",
    },
    // action: {
    //   hover:'#1a237e',
    //   selected: '#1a237e'
    // },
  },

  typography: {
    fontFamily: RobotoMono,
  },
  overrides: {
    MuiButton: {
      root: {
        color: "#18ffff",
        "&:hover": {
          backgroundColor: "#ff00a9",
          contrastText: "#000",
          color: "#FFF",
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        color: "#ff00a9",
        backgroundColor: "#000",
      },
    },
    MuiListItemButton: {
      root: {
        "&:hover": {
          backgroundColor: "#ff00a9",
          color: "#FFF",
        },
      },
    },
    MuiListItemIcon: {
      root: {
        color: "#18ffff",
        "&:hover": {
          backgroundColor: "#ff00a9",
          color: "#FFF",
        },
        minWidth: "0px",
      },
    },
    MuiSvgIcon: {
      root: {
        fill: "#18ffff",
      },
      "&:hover": {
        fill: "#fff",
      },
    },
    MuiCssBaseline: {
      "@global": {
        "@font-face": [RobotoMono],
      },
      body: {
        fontFamily: ["Roboto-Mono", "NotoSans"].join(","),
      },
      typography: {
        fontFamily: RobotoMono,
        NotoSans,
      },
    },
    MuiTypography: {
        root: {
            fontFamily: RobotoMono,
        }
    },
  },
});

export default theme;
