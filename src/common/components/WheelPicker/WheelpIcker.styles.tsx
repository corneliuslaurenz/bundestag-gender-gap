import { SxProps } from "@mui/material";

export const wrapperStyle: SxProps = {
  width: "100%",
  height: "80px",
  overflow: "hidden",
  position: "relative",
  display: "flex",
  alignItems: "center",
  "@media (max-width: 650px)": { height: "80px" },
};

export const listStyle: SxProps = {
  display: "flex",
  position: "absolute",
  left: 0,
  top: 0,
};

export const itemBoxStyle = (isActive: boolean, width: number): SxProps => ({
  width: width / 3,
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  opacity: isActive ? 1 : 0.55,
  zIndex: isActive ? 10 : 100,
  transform: isActive
    ? "scale(1.8) translateY(20px)"
    : "scale(1.2) translateY(14px)",
  transition: "all 0.3s",
  "@media (max-width: 650px)": { height: "40px" },
});

export const typographyStyle = (isActive: boolean, width: number): SxProps => ({
  fontWeight: 600,
  cursor: !isActive ? "pointer" : "default",
  height: "fit-content",
  justifyContent: "flex-start",
  color: !isActive ? "#C2ADC5" : "white",
  width: width < 400 ? "50%" : "fit-content",
  textAlign: "center",
  userSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
});
