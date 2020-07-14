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
        main: '#6200EE'
    },
    secondary: {
        main:'#64ffda'
    },
    type: "dark",
  },

  typography: {
    fontFamily: RobotoMono,
  },
  overrides: {
   
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
