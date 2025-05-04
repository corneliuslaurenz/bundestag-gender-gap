import { SxProps } from "@mui/material";

export const wrapperStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "10vh",
  position: "relative",
  "@media (max-width: 1200px)": {
    gap: "12vh",
  },
  "@media (max-width: 650px)": {
    gap: "0",
  },
};

export const innerBoxStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: "4vh",
  "@media (max-width: 650px)": {
    gap: "2vh",
  },
};

export const titleContainerStyle: SxProps = {
  position: "relative",
  left: "2vw",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
};

export const centeredTitleStyle: SxProps = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  textAlign: "center",
  "@media (max-width: 950px)": {
    width: "72%",
    alignSelf: "center",
    gap: "1rem",
  },
};

export const switchBarRowStyle: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  width: "100vw",
  position: "relative",
};

export const getSwitchBoxStyle = (barWidth: number): SxProps => ({
  width: barWidth * 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  flexDirection: "column",
});

export const switchLabelStyle: SxProps = {
  "@media (max-width: 950px)": {
    fontSize: ".75rem",
  },
  "@media (max-width: 650px)": {
    fontSize: ".5rem",
  },
};

export const legendWrapperStyle: SxProps = {
  position: "relative",
};

export const legendStyle: SxProps = {
  marginTop: "1%",
  marginLeft: "2vw",
  position: "absolute",
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  zIndex: 99,
};

export const legendTextBoxStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: ".7rem",
  textAlign: "left",
};

export const legendTextStyle: SxProps = {
  fontSize: ".75rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  lineHeight: 1,
  color: "white",
  "@media (max-width: 950px)": {
    fontSize: ".5rem",
  },
};

export const legendBarContainerStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  gap: ".70rem",
  justifyContent: "space-around",
};

export const getLegendBarStyle = (color: string): SxProps => ({
  width: "40px",
  height: "12px",
  backgroundColor: color,
});

export const chartWrapperStyle: SxProps = {
  position: "relative",
  width: "100%",
  marginTop: "0%",
  height: "100%",
  "@media (max-width: 950px)": {
    marginTop: "4%",
  },
};

export const svgStyle: React.CSSProperties = {
  zIndex: 9999,
  position: "relative",
};

export const smallBarsStyle: SxProps = {
  position: "absolute",
  top: "55%",
  height: "300vh",
};
