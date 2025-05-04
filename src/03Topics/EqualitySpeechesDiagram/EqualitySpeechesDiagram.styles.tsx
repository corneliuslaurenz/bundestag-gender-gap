import { SxProps } from "@mui/material";

export const wrapperStyles: SxProps = {
  background: "#5E3730",
  width: "100%",
  height: "110vh",
  minHeight: "100vh",
  position: "relative",
  display: "flex",
  justifyContent: "center",
  "@media (max-height: 700px)": {
    height: "130vh",
  },
  "@media (max-height: 600px)": {
    height: "150vh",
  },
};

export const containerStyles: SxProps = {
  background: "#5E3730",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  textAlign: "center",
  alignContent: "center",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "450px",
  maxWidth: "1200px",
};
