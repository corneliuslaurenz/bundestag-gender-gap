import { CSSProperties, SxProps } from "@mui/material";

export const wrapperStyle: SxProps = {
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "@media (max-height: 800px)": {
    marginTop: "50vh",
  },
};

export const innerWrapperStyle: SxProps = {
  width: "84vw",
  height: "72vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  "@media (max-width: 950px) or (max-height: 800px)": {
    height: "100vh",
    width: "100vw",
  },
  "@media (max-height: 800px)": {
    height: "100vwh",
  },
};

export const contentBoxStyle: SxProps = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "10%",
  "@media (max-width: 950px)": {
    gap: "2rem",
    justifyContent: "center",
  },
  "@media (max-width: 450px)": {
    gap: "1rem",
  },
  "@media (max-height: 800px)": {
    gap: ".5rem",
    justifyContent: "center",
  },
};

export const topSectionStyle: SxProps = {
  flex: "0 0 auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "34%",
  "@media (max-width: 950px) or (max-height: 800px)": {
    gap: "6%",
    height: "unset",
  },
  "@media (max-height: 800px)": {
    height: "unset",
    gap: "1.5rem",
  },
};

export const mainTitleStyle: SxProps = {
  fontSize: "6rem",
  fontFamily: '"Ubuntu", sans-serif',
  fontWeight: 700,
  letterSpacing: 0.25,
  textAlign: "left",
  color: "white",
  "@media (max-width: 1400px)": {
    fontSize: "5rem",
  },
  "@media (max-width: 1280px)": {
    fontSize: "4rem",
  },
  "@media (max-width: 950px) or (max-height: 800px)": {
    fontSize: "3.5rem",
    marginBottom: "1vh",
    textAlign: "center",
    justifyContent: "center",
  },
  "@media (max-width: 650px)": {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    width: "84%",
    alignSelf: "center",
  },
};

export const subtitleStyle: SxProps = {
  fontSize: "1.5rem",
  fontFamily: '"Ubuntu", sans-serif',
  fontWeight: 700,
  color: "white",
  textAlign: "left",
  width: "84%",
  "@media (max-width: 950px)": {
    textAlign: "center",
    width: "68%",
    alignSelf: "center",
  },

  "@media screen and (max-height: 800px) and (min-width: 951px)": {
    textAlign: "center",
    width: "60%",
    marginLeft: "auto",
    marginRight: "auto",
    height: "60px",
  },

  "@media (max-width: 450px)": {
    height: "60px",
  },
};

export const switchRowStyle: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: "1vw",
  alignItems: "center",
  "@media (max-width: 950px) or (max-height: 800px)": {
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
};

export const wheelPickerContainerStyle: SxProps = {
  "@media (max-width: 950px)": {
    alignSelf: "center",
    marginTop: ".5rem",
    height: "8rem",
  },
  "@media (max-height: 800px)": {
    alignSelf: "center",
    marginTop: "0",
    marginBottom: "0",
    height: "6rem",
  },
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
};

export const svgContainerStyle = (isDesktop: boolean): SxProps => ({
  height: isDesktop ? "100%" : "50%",
  marginTop: isDesktop ? 0 : "2rem",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const svgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  shapeRendering: "geometricPrecision",
};
