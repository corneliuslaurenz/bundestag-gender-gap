import { SxProps } from "@mui/material";

export const wrapperStyle = (isCategorySelected: boolean): SxProps => ({
  width: "10%",
  position: "relative",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  gap: "2.5vh",
  height: "300px",
  "@media (max-width: 950px)": {
    flexBasis: "50%",
    height: isCategorySelected ? "335px" : "unset",
    flexShrink: "1",
  },
});

export const categoryBoxStyle: SxProps = {
  display: "flex",
  gap: ".5rem",
  flexDirection: "column",
  cursor: "pointer",
};

export const iconWrapperStyle: SxProps = {
  "@media (max-width: 950px)": {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "left",
    width: "100%",
    alignSelf: "center",
  },
};

export const titleStyle = (isCategorySelected: boolean): SxProps => ({
  fontSize: ".75rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  lineHeight: 1.6,
  textAlign: "center",
  alignSelf: "center",
  width: "100%",
  color: isCategorySelected ? "white" : "#D6B29B",

  "@media (max-width: 950px)": {
    width: "76%",
  },
});

export const topicsContainerStyle = (isCategorySelected: boolean): SxProps => ({
  width: "100%",
  position: "relative",
  display: "flex",
  textAlign: "center",
  flexDirection: "column",
  gap: "1.5vh",
  "@media (max-width: 1200px)": {
    height: isCategorySelected ? "20vh" : "fit-content",
  },
});

export const topicStyle = (
  isCategorySelected: boolean,
  isTopicSelected: boolean
): SxProps => ({
  cursor: "pointer",
  fontSize: ".75rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 400,
  lineHeight: 1.2,
  opacity: !isCategorySelected && !isTopicSelected ? 0 : 1,
  visibility: !isCategorySelected && !isTopicSelected ? 0 : 1,
  color: isTopicSelected ? "white" : "#D6B29B",
  "@media (max-width: 950px)": {
    fontSize: ".75rem",
    textAlign: "center",
  },
});
