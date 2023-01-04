import { createTheme } from "@mui/material/styles";

export const getTheme = () => {
  return {
    primary: "#28666E",
    secondary: "#CFD11A",
    white: "#FFFDFD",
    grey: "#CACFD6",
    black: "#100113",
    error: "#D9381E",
  };
};

const primaryDark = "#100113";
const secondaryDark = "#CACFD6";
const tertiary = "#28666E";
const tertiarySecond = "#CFD11A";
export const theme = createTheme({
  palette: {
    primary: {
      main: primaryDark,
      contrastText: secondaryDark,
    },
    secondary: {
      main: secondaryDark,
      contrastText: primaryDark,
    },
    tertiary: {
      main: tertiary,
      secondary: tertiarySecond,
    },
  },
  a: {
    textDecoration: "none",
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "1rem",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: secondaryDark,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "outlined" },
              style: {
                color: tertiary,
              },
            },
          ],
          color: tertiary,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          color: tertiary,
          "&.MuiInputLabel-shrink": {
            color: tertiary,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: tertiary,
          ":focus": {
            color: tertiary,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "outlined" },
              style: {
                color: tertiary,
              },
            },
          ],
          color: tertiary,
          borderColor: tertiary,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "cta" },
          style: {
            backgroundColor: tertiary,
            ":active": {
              backgroundColor: tertiary,
            },
            ":hover": {
              backgroundColor: tertiarySecond,
            },
          },
        },
      ],
    },
    MuiLink: {
      variants: [
        {
          props: { variant: "body2" },
          style: {
            color: secondaryDark,
          },
        },
      ],
    },
  },
});
