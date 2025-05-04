import { SxProps } from "@mui/material";

export const containerStyle: SxProps = {
  marginLeft: "4%",
  marginTop: "12%",
  width: "100%",
  overflow: "hidden",
};

export const mouseStyle: SxProps = {
  width: 27.5,
  height: 55,
  border: "4px solid white",
  borderRadius: "20px",
  position: "relative",
  transition: "opacity 1s ease, visibility 1s ease",
  "@media (max-width: 950px)": {
    opacity: 0,
    visibility: "hidden",
  },
  "@media (max-width: 1200px)": {
    width: 20.5,
    height: 46,
    border: "3.4px solid white",
  },
};

export const dotStyle: SxProps = {
  width: 6,
  height: 8,
  backgroundColor: "white",
  borderRadius: "50%",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: 10,
};

export const labelStyle: SxProps = {
  marginTop: "100%",
  position: "absolute",
  left: "225%",
  transform: "translateY(-50%)",
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
};

export const textStyle: SxProps = {
  fontSize: "1rem",
};
