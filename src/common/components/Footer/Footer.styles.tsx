import { SxProps } from "@mui/material";

export const wrapperStyle = (isContactPage?: boolean): SxProps => ({
  width: "100%",
  height: isContactPage ? "100%" : "150px",
  backgroundColor: !isContactPage ? "#8F4D3F" : "transparent",
  display: "flex",
  justifyContent: "center",
  "@media (max-width: 950px)": {
    height: isContactPage ? "100%" : "175px",
  },
});

export const innerBoxStyle = (
  isContactPage?: boolean,
  isTablet?: boolean
): SxProps => ({
  width: !isTablet ? "90vw" : isContactPage ? "80vw" : "100vw",
  display: "flex",
  flexDirection: isContactPage && !isTablet ? "column" : "row",
  justifyContent: isContactPage ? "center" : "space-evenly",
  gap: isContactPage && !isTablet ? "4rem" : isContactPage ? "12vw" : "0",
  alignItems: "center",
});

export const footerLinkStyle = (
  isContactPage?: boolean,
  isDesktop?: boolean
): SxProps => ({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  justifyContent: "center",
  width: isContactPage ? "180px" : isDesktop ? "260px" : "fit-content",

  "@media (max-width: 650px)": {
    flexDirection: "column",
    textAlign: "center",
    gap: ".75rem",
  },
});

export const hsdImageStyle = {
  height: "18px",
};

export const linkedinImageStyle = {
  width: "20px",
  height: "20px",
};
