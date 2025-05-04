import { SxProps } from "@mui/material";

export const controlWrapperStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  width: "160px",
  justifyContent: "flex-end",
  alignSelf: "flex-end",
  gap: "4vh",
  "@media (max-width: 950px)": {
    width: "110px",
  },
};

export const labelTypographyStyle: SxProps = {
  width: "100%",
};

export const rowWrapperStyle: SxProps = {
  display: "flex",
  alignItems: "flex-end",
  width: "100%",
};

export const listContainerStyle: SxProps = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  width: "65%",
};

export const buttonStyle: SxProps = {
  textTransform: "none",
  flexDirection: "column",
  gap: ".25rem",
};

export const speechTextStyle = (isSelected: boolean): SxProps => ({
  fontSize: "1.25rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  lineHeight: 1,
  color: isSelected ? "white" : "#708DC1",
  "@media (max-width: 950px)": {
    fontSize: "1rem",
  },
});

export const smallTextStyle = (isSelected: boolean): SxProps => ({
  fontSize: ".75rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  lineHeight: 1,
  color: isSelected ? "white" : "#708DC1",
});

export const yearTextStyle = (isSelected: boolean): SxProps => ({
  fontSize: "1rem",
  fontWeight: 600,
  fontFamily: '"Inter", sans-serif',
  color: isSelected ? "white" : "#708DC1",
});
