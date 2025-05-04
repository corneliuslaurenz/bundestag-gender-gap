import { SxProps } from "@mui/material";

export const wrapperStyles = {
  background: "#4F3F50",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  textAlign: "left",
  gap: "6vh",
  alignItems: "center",
  height: "110vh",
  alignContent: "center",
  flexDirection: "column",
  "@media (max-height: 740px)": {
    minHeight: "calc(120vh - 14vh - 14vh)",
    paddingTop: "14vh",
    paddingBottom: "14vh",
  },
  "@media (max-width: 1200px)": { gap: "4vh" },
  "@media (max-width: 950px)": { gap: "4vh" },
};

export const headerBoxStyles = (showImpression: boolean): SxProps => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  width: !showImpression ? "80vw" : "100%",
  justifyContent: "center",
  alignItems: "center",
  "@media (max-width: 650px)": {
    gap: "2rem",
  },
});

export const headerContainerStyles = (showImpression: boolean): SxProps => ({
  display: "flex",
  flexDirection: "row",
  gap: showImpression ? "2vw" : "8vw",
  "@media (max-width: 650px)": {
    flexDirection: "column",
    alignItems: "center",
    gap: showImpression ? "4vw" : "8vw",
  },
});

export const titleContainerStyles = {
  display: "flex",
  justifyContent: "center",
  width: "32vw",
  "@media (max-width: 1280px)": { width: "50vw" },
  "@media (max-width: 950px)": { width: "58vw" },
  "@media (max-width: 650px)": { width: "70vw" },
};

export const titleStyles = {
  fontSize: "4rem",
  fontFamily: '"Ubuntu", sans-serif',
  fontWeight: 600,
  lineHeight: 1.2,
  letterSpacing: "-0.5px",
  color: "white",
  textAlign: "center",
  width: "100%",
  "@media (max-width: 1280px)": { fontSize: "3.5rem" },
  "@media (max-width: 950px)": { fontSize: "3rem" },
  "@media (max-width: 650px)": { fontSize: "2.5rem" },
};

export const diagramContainerStyles = (showImpression: boolean): SxProps => ({
  width: "80vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6rem",
  height: "fit-content",
  "@media (max-width: 1400px)": { gap: "5rem" },
  "@media (max-width: 1200px)": { gap: "4rem" },
  "@media (max-width: 950px)": {
    flexDirection: "column",
    gap: showImpression ? "2rem" : "1rem",
  },
  "@media (max-width: 650px)": { width: "94vw", gap: "2rem" },
});

export const desktopBoxStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "10rem",
};

export const arcDiagramContainerStyles = {
  width: "50vmin",
  "@media (max-width: 650px)": { width: "60vmin" },
};

export const rotatedBoxStyles = {
  transform: "rotate(180deg)",
};

export const displayContainerStyles = {
  display: "flex",
  width: "fit-content",
  justifyContent: "space-around",
  "@media (max-width: 950px)": {
    gap: "3rem",
    width: "84%",
    height: "236px",
  },
};

export const percentageBoxStyles = (showImpression: boolean): SxProps => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: showImpression ? "100%" : "80vw",
  justifyContent: "center",
  alignItems: "center",
});
