import { SxProps } from "@mui/material";

export const containerStyles = (isTopicExploration: boolean): SxProps => ({
  display: "flex",
  flexDirection: "column",
  width: isTopicExploration ? "14rem" : "10rem",
  height: "236px",
  justifyContent: "center",
  "@media (max-width: 950px)": {
    overflow: "hidden",
    height: "100%",
  },
});

export const valueBoxStyles = (left: boolean): SxProps => ({
  width: "fit-content",
  justifyItems: left ? "flex-end" : "flex-start",
  "@media (max-width: 950px)": {
    justifyItems: "center",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});

export const percentageTextStyles: SxProps = {
  fontSize: "2rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  lineHeight: 1,
  width: "65%",
  color: "#ffffff",
  textAlign: "center",
  "@media (max-width: 1280px)": {
    fontSize: "1.5rem",
  },
  "@media (max-width: 950px)": {
    fontSize: "1.5rem",
    width: "100%",
  },
};

export const labelTextStyles = (isTopicExploration: boolean): SxProps => ({
  width: "65%",
  fontWeight: 600,
  textAlign: "center",
  "@media (max-width: 950px)": {
    width: isTopicExploration ? "70%" : "100%",
    alignSelf: "center",
    alignItems: "center",
    margin: "0 auto",
  },
});
