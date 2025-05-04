import { SxProps } from "@mui/material";

export const triangleContainerStyles: SxProps = {
  zIndex: 9,
  position: "absolute",
  marginTop: "18%",
  marginLeft: "10%",
  width: 50,
  height: 50,
  "@media (max-width: 950px)": {
    width: 25,
    height: 25,
  },
};
