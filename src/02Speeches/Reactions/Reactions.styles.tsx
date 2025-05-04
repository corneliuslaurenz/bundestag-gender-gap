import { SxProps } from "@mui/material";

export const wrapperStyle: SxProps = {
  position: "relative",
};

export const contentBoxStyle: SxProps = {
  position: "relative",
  marginLeft: "8vw",
  paddingTop: "136vh",
  paddingBottom: "50vh",
  textAlign: "center",
  zIndex: 1000,
  "@media (max-width:650px)": {
    paddingTop: "60vh",
  },
};

export const bottomBoxWrapperStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export const bottomBoxStyle: SxProps = {
  position: "relative",
  textAlign: "center",
  width: "60vw",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16vh",
};
