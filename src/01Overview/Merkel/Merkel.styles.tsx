import { SxProps } from "@mui/material";

export const merkelContainerStyle: SxProps = {
  position: "relative",
  background: "#2F2230",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 9999,
};

export const merkelImageStyle: SxProps = {
  objectFit: "contain",
  objectPosition: "top",
  transform: "translateX(-4px)",
  alignSelf: "flex-start",
};
