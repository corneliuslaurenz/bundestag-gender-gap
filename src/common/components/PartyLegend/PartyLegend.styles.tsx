import { SxProps } from "@mui/material";

export const legendWrapperStyles: SxProps = {
  display: "flex",
  flexDirection: "column",
};

export const legendItemStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: "0.75rem",
  paddingTop: "0.75rem",
  "@media (max-width: 950px)": {
    paddingBottom: "0.5rem",
    paddingTop: "0.55rem",
  },
};

export const nameColumnStyles: SxProps = {
  width: "160px",
  textAlign: "left",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  "@media (max-width: 950px)": { width: "100%", gap: "0.25rem" },
};

export const circleStyles = (color: string): SxProps => ({
  width: "16px",
  aspectRatio: "1 / 1",
  borderRadius: "50%",
  backgroundColor: color,
});

export const borderLineStyles: SxProps = {
  width: "94%",
  height: "1px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  margin: "0 auto",
  opacity: 0.6,
};
