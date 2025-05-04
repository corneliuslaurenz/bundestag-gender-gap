import { SxProps } from "@mui/material";

export const wrapperStyle = (radius: number): SxProps => ({
  position: "relative",
  width: `${radius * 2}`,
  height: `${radius * 2}`,
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
});

export const centerContentStyle = (iconPath: boolean): SxProps => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  gap: ".5rem",
  transform: iconPath ? "translateY(-10px)" : "unset",
});

export const iconBoxStyle = (radius: number): SxProps => ({
  zIndex: 1000000,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: `${radius}`,
  alignItems: "center",
  alignContent: "center",
  textAlign: "center",
});

export const textContainerStyle: SxProps = {
  width: "154px",
};

export const textStyle: SxProps = {
  wordBreak: "break-word",
  wordWrap: "break-word",
  hyphens: "auto",
  fontSize: "1rem",
  width: "100%",
};
