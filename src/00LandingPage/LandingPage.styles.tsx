import { SxProps } from "@mui/material";

export const wrapperStyle: SxProps = {
  background: "linear-gradient(to bottom, #708DC1, #5265A3)",
  width: "100%",
  position: "relative",
  margin: 0,
  willChange: "transform",
  transform: "translate3d(0, 0, 0)",
};

export const textWrapperStyle: SxProps = {
  willChange: "transform",
  position: "absolute",
  marginLeft: "8vw",
  textAlign: "left",
  marginTop: "26vh",
  width: "40vw",
  zIndex: "1000",
  "@media (max-width: 950px)": {
    marginTop: "20vh",
  },
  "@media (max-width: 650px)": {
    paddingTop: "12vh",
    width: "50vh",
    marginTop: 0,
  },
};

export const textContainerStyle: SxProps = {
  width: "100%",
  position: "relative",
};

export const womanImageStyle: SxProps = {
  position: "relative",
  paddingTop: "23.5vh",
  paddingLeft: "34vw",
  width: "53vw",
  zIndex: "100",
  marginBottom: "-20px",
  "@media (max-width: 950px)": {
    paddingTop: "20vh",
  },
  "@media (max-width: 650px)": {
    paddingTop: "50vh",
    width: "80vw",
    paddingLeft: "18vw",
  },
};

export const rectangleImageStyle: SxProps = {
  position: "absolute",
  marginLeft: "32vw",
  marginTop: "18vh",
  width: "53.5vw",
  zIndex: "50",
  "@media (max-width: 950px)": {
    marginTop: "14vh",
  },
  "@media (max-width: 650px)": {
    marginTop: "44vh",
    width: "82vw",
    marginLeft: "14.5vw",
  },
};

export const tableImageStyle: SxProps = {
  position: "absolute",
  marginTop: "34vh",
  width: "56vw",
  right: 0,
  zIndex: "10",
  "@media (max-width: 950px)": {
    marginTop: "28vh",
  },
  "@media (max-width: 650px)": {
    marginTop: "50vh",
    width: "77vw",
  },
};

export const subheadlineStyle: SxProps = {
  fontSize: "3rem",
  fontFamily: '"Ubuntu", sans-serif',
  fontWeight: 700,
  lineHeight: 1.2,
  textAlign: "left",
  display: "inline",
  color: "white",
  "@media (max-width: 1280px)": {
    fontSize: "2rem",
  },
  "@media (max-width: 950px)": {
    fontSize: "1.5rem",
  },
};

export const headlineStyle: SxProps = {
  fontSize: "6.5rem",
  fontFamily: '"Ubuntu", sans-serif',
  fontWeight: 700,
  lineHeight: 1,
  letterSpacing: "-0.5px",
  color: "white",
  "@media (max-width: 1400px)": {
    fontSize: "5rem",
  },
  "@media (max-width: 1000px)": {
    fontSize: "3.5rem",
  },
};
