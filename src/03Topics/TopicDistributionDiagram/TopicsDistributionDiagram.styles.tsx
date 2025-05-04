import { SxProps } from "@mui/material";

export const h1AlternativeStyle: SxProps = {
  fontSize: "6rem",
  marginTop: "2rem",
  "@media (max-width: 1400px)": {
    fontSize: "5rem",
  },
  "@media (max-width: 950px)": {
    fontSize: "4rem",
  },
  "@media (max-width: 650px)": {
    fontSize: "2.5rem",
  },
};

export const wrapperStyle: SxProps = {
  backgroundColor: "#AC614A",
  width: "100%",
  height: "fit-content",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
};

export const headingContainerStyle: SxProps = {
  position: "relative",
  marginTop: "18vh",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  width: "80%",
};

export const subHeadingContainerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: "84vw",
  gap: "2vh",
};

export const svgWrapperStyle: SxProps = {
  marginBottom: "24vh",
  width: "84vw",
};
