import { SxProps } from "@mui/material";

export const topSectionStyles: SxProps = {
  background: "#5265A3",
  width: "100%",
  height: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  textAlign: "center",
  alignContent: "center",
  flexDirection: "column",
  willChange: "transform",
};

export const topTextContainerStyles: SxProps = {
  paddingTop: "18vh",
};

export const illustrationContainerStyles: SxProps = {
  width: "38%",
  willChange: "transform",
  position: "absolute",
  right: "0",
  bottom: "-10px",
  maxHeight: "60vh",
  "@media (max-width: 1200px)": {
    width: "52%",
  },
  "@media (max-width: 950px)": {
    width: "70%",
  },
};

export const bottomSectionStyles: SxProps = {
  background: "#475486",
  width: "100%",
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
  alignContent: "center",
  justifyContent: "center",
  alignItems: "center",
};

export const headlineContainerStyles: SxProps = {
  position: "relative",
  marginLeft: "8vw",
  height: "101vh",
  textAlign: "left",
  width: "84vw",
  zIndex: "1000",
};
