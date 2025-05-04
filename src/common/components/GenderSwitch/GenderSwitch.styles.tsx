import { SxProps } from "@mui/material";

export const genderSwitchWrapper: SxProps = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  zIndex: "1000",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2vh",
};

export const leftSideBox = (isDesktop: boolean): SxProps => ({
  display: "flex",
  flexDirection: "row",
  zIndex: "1000",
  gap: "1vw",
  alignItems: "center",
  justifyContent: "left",
  width: isDesktop ? "200px" : "unset",
});

export const rightSideBox = (isDesktop: boolean): SxProps => ({
  display: "flex",
  flexDirection: "row",
  zIndex: "1000",
  gap: "4vw",
  justifyContent: "right",
  width: isDesktop ? "200px" : "unset",
});

export const innerRightControls: SxProps = {
  display: "flex",
  flexDirection: "row",
  zIndex: "1000",
  gap: "1vw",
  justifyContent: "center",
  alignItems: "center",
};
