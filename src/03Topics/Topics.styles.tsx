import { SxProps } from "@mui/material";

export const wrapperSx: SxProps = {
  margin: 0,
  backgroundColor: "#AC614A",
  width: "100%",
  height: "196vh",
  position: "relative",
  overflow: "hidden",
  paddingTop: "18vh",
  display: "flex",
  textAlign: "center",
  alignContent: "center",
  flexDirection: "column",
  willChange: "transform",
  boxSizing: "border-box",
};

export const scrollWrapperSx: SxProps = {
  paddingTop: "2vh",
};

export const textBlockSx: SxProps = {
  position: "relative",
  marginLeft: "8vw",
  marginTop: "26vh",
  textAlign: "left",
  width: "84vw",
  zIndex: 1000,
};
