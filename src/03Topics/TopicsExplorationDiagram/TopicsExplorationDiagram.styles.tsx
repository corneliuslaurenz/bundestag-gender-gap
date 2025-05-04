import { SxProps } from "@mui/material";

export const wrapperStyles: SxProps = {
  background: "#5E3730",
  width: "100%",
  height: "110vh",
  minHeight: "100vh",
  position: "relative",
  display: "flex",
  justifyContent: "center",
};

export const containerStyles: SxProps = {
  background: "#5E3730",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  paddingTop: "20vh",
  display: "flex",
  textAlign: "center",
  alignContent: "center",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "1200px",
};

export const containerStyle: SxProps = {
  backgroundColor: "#8F4D3F",
  width: "100%",
  height: "fit-content",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  alignItems: "center",
  paddingBottom: "2rem",
  "@media (max-width: 1200px)": { paddingBottom: "6rem" },
};

export const headerWrapperStyle: SxProps = {
  position: "relative",
  marginTop: "18vh",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  width: "80%",
};

export const contentWrapperStyle: SxProps = {
  display: "flex",
  flexDirection: "row",
  width: "96%",
  justifyContent: "space-around",
  position: "relative",
  marginTop: "20vh",

  "@media (max-width: 950px)": {
    flexDirection: "column",
    justifyContent: "center",
  },
};

export const topicsWrapperStyle: SxProps = {
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "fit-content",
  justifyContent: "space-around",
  position: "relative",
  zIndex: 9999,
  "@media (max-width: 950px)": {
    flexWrap: "wrap",
    width: "88%",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "4vh",
  },
};

export const chartContainerStyle: SxProps = {
  position: "absolute",
  top: "240px",
  width: "100%",
  "@media (max-width: 1400px)": {
    top: "240px",
  },
  "@media (max-width: 1200px)": {
    top: "260px",
  },
  "@media (max-width: 950px)": {
    top: "20px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  "@media (min-width: 951px) and (max-height: 800px)": {
    top: "220px",
  },
};

export const percentageWrapperStyle: SxProps = {
  display: "flex",
  position: "absolute",
  top: "0",
  width: "100%",
  zIndex: 999,
  gap: "34vw",
  alignSelf: "center",
  justifyContent: "center",
  "@media (max-width: 950px)": {
    position: "relative",
    justifyContent: "space-around",
    gap: "3rem",
  },
  "@media (max-width: 450px)": {
    width: "100%",
  },
};

export const statsWrapperStyle: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
  "@media (max-width: 900px)": { marginTop: "3.2rem" },
};

export const statsInnerWrapperStyle: SxProps = {
  zIndex: 999,
  gap: ".25rem",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  textAlign: "left",
  width: "fit-content",
};

export const timelineWrapperStyle: SxProps = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
};

export const typographyStyle: SxProps = {
  fontSize: ".75rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  lineHeight: 1,
  paddingLeft: 1,
  textAlign: "left",
};

export const percentageDisplayStyle: SxProps = {
  height: "400px",
  "@media (max-width: 950px)": {
    height: "100px",
    position: "relative",
    alignItems: "center",
  },
};
