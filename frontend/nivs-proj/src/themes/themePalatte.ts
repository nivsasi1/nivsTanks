import { PaletteColorOptions, createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomPalette {
    mainBG: PaletteColorOptions;
    paperBG: PaletteColorOptions;
    secondary: PaletteColorOptions;
    logoutB: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    mainBG: true;
    paperBG: true;
    secondary: true;
    logoutB: true;
  }
}

export const theme = createTheme({
  palette: {
    mainBG: {
      main: "#FBFBFF",
    },
    paperBG: {
      main: "#F0F3FFa0",
    },
    secondary: {
      main: "#899BF8",
      contrastText: "white",
    },
    logoutB: {
      main: "#3548ab",
      contrastText: "white",
    },
  },
});
