import { SxProps } from "@mui/material";

export const wrapperStyles = (showImpression: boolean): SxProps => ({
  display: "flex",
  flexDirection: !showImpression ? "row" : "column",
  gap: !showImpression ? "8rem" : ".5rem",
  width: "100%",
  justifyContent: "center",
  "@media (max-width: 950px)": {
    justifyContent: "space-around",
    width: "100%",
    gap: !showImpression ? "4rem" : ".5rem",
  },
  "@media (max-width: 650px)": {
    flexDirection: "column",
    gap: "0.25rem",
    alignItems: "center",
  },
});

export const outerBoxStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  justifyContent: "center",
  "@media (max-width: 650px)": {
    width: "50%",
  },
};

export const innerRowStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: "1.5rem",
  justifyContent: "center",
};

export const labelWrapperStyles: SxProps = {
  display: "flex",
  flexDirection: "row",
  gap: ".75rem",
  justifyContent: "center",
};

export const labelTextStyles: SxProps = {
  alignSelf: "center",
  fontWeight: 600,
};
