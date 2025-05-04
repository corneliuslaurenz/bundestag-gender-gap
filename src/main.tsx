import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import App from "./App";
import "./fonts.css";

const theme = createTheme({
  typography: {
    h1: {
      fontSize: "7.5rem",
      fontFamily: '"Ubuntu", sans-serif',
      fontWeight: 700,
      letterSpacing: 0.25,
      color: "white",
      marginBottom: "2rem",
      "@media (max-width: 1400px)": {
        fontSize: "7rem",
      },
      "@media (max-width: 1280px)": {
        fontSize: "6.5rem",
      },
      "@media (max-width: 950px)": {
        fontSize: "4.5rem",
      },
      "@media (max-width: 650px)": {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "2.25rem",
      fontFamily: '"Ubuntu", sans-serif',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
      color: "white",
      "@media (max-width: 1400px)": {
        fontSize: "2rem",
      },
      "@media (max-width: 1280px)": {
        fontSize: "1.75rem",
      },
      "@media (max-width: 950px)": {
        fontSize: "1.5rem",
      },
      "@media (max-width: 650px)": {
        letterSpacing: "0",
        fontSize: "1.25rem",
      },
    },
    h3: {
      fontSize: "1.5rem",
      fontFamily: '"Ubuntu", sans-serif',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
      color: "white",
      "@media (max-width: 1280px)": {
        fontSize: "1.25rem",

        "@media (max-width: 950px)": {
          fontSize: "1rem",
        },
        "@media (max-width: 650px)": {
          letterSpacing: "0",
          fontSize: "0.75rem",
        },
      },
    },
    subtitle1: {
      fontSize: "7rem",
      fontFamily: '"Inria Serif", serif',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
      color: "white",
      "@media (max-width: 1280px)": {
        fontSize: "6rem",
      },
      "@media (max-width: 950px)": {
        fontSize: "5rem",
      },
      "@media (max-width: 650px)": {
        fontSize: "3.5rem",
      },
    },
    subtitle2: {
      fontSize: "3rem",
      fontFamily: '"Inria Serif", serif',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
      color: "white",
      "@media (max-width: 1280px)": {
        fontSize: "2.5rem",
      },
      "@media (max-width: 950px)": {
        fontSize: "2rem",
      },
      "@media (max-width: 650px)": {
        fontSize: "1.5rem",
      },
    },
    body1: {
      fontSize: "1.2rem",
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      lineHeight: 1,
      color: "white",

      "@media (max-width: 950px)": {
        fontSize: "1rem",
      },
    },
    body2: {
      fontSize: "1rem",
      fontFamily: '"Inter", sans-serif',
      fontWeight: 500,
      lineHeight: 1.25,
      color: "white",

      "@media (max-width: 950px)": {
        fontSize: ".75rem",
      },
    },
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          //thumb - unchecked
          color: "#8BA8CF",
        },
        colorPrimary: {
          "&.Mui-checked": {
            // thumb - checked
            color: "#8BA8CF",
          },
        },
        track: {
          // track - unchecked
          opacity: 0.9,
          backgroundColor: "#F4F7FA",
          ".Mui-checked.Mui-checked + &": {
            // track - checked
            opacity: 0.9,
            backgroundColor: "#677EB8",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "#282D43",
          "&:hover": {
            backgroundColor: "#708DC1",
          },
          "&.Mui-focused": {
            borderColor: "#8BA8CF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8BA8CF",
          },
          "&.MuiSelect-select": {
            color: "#282D43",
          },
        },
        icon: {
          color: "black",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
          marginTop: "-20px",
          "&.Mui-focused": {
            color: "#282D43",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#282D43",
          "&.Mui-selected": {
            backgroundColor: "#8BA8CF",
            color: "#282D43",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#8BA8CF",
          },
          "&:hover": {
            backgroundColor: "lightgray",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8BA8CF",
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
