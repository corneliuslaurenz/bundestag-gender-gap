import { SxProps } from "@mui/material";

export const menuWrapperStyle: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  position: "fixed",
  top: "50px",
  width: "100%",
  zIndex: 99999,
};

export const menuLeftStyle: SxProps = {
  display: "flex",
  gap: "30px",
  fontWeight: "lighter",
  fontFamily: "monospace",
  opacity: 0.9,
  paddingLeft: "4rem",

  "@media (max-width: 1240px)": {
    gap: "20px",
  },
};

export const menuRightStyle: SxProps = {
  display: "flex",
  gap: "30px",
  fontWeight: "lighter",
  fontFamily: "monospace",
  opacity: 0.9,
  paddingRight: "4rem",

  "@media (max-width: 1240px)": {
    gap: "20px",
  },
};

export const menuItemStyle = (highlight?: boolean): SxProps => ({
  position: "relative",
  cursor: "pointer",
  width: "128px",
  height: "32px",
  zIndex: 9999,
  backgroundColor: highlight ? "white" : "white",
  opacity: highlight ? 0.8 : 0.8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "40px",
  transition: "0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  ".menuText": {
    color: "#3C486C",
    transition: "0.2s ease",
  },

  "&:hover .menuText": {
    color: "white",
  },

  // show dot as active indicator
  "&::before": {
    opacity: highlight ? 0.7 : 0,
    height: "5px",
    content: '""',
    position: "absolute",
    top: "45%",
    left: "16%",
    width: highlight ? "5px" : "0px",
    backgroundColor: "#3C486C",
    borderRadius: "50%",
    transition: "0.4s ease",
  },
  "&:hover::before": {
    backgroundColor: "white",
  },
});

export const burgerMenuWrapperStyle: SxProps = {
  position: "fixed",
  top: "6vh",
  display: "flex",
  justifyContent: "flex-end",
  width: "94vw",
  zIndex: 10000,
};

export const menuFontStyles: SxProps = {
  fontSize: ".875rem",
  fontFamily: '"Inter", sans-serif',
  fontWeight: 600,
  lineHeight: 1.25,
  paddingTop: "1px",
  position: "relative",

  "@media (max-width: 1250px)": {
    fontSize: ".75rem",
  },
};

export const burgerMenuContentStyle: SxProps = {
  position: "fixed",
  top: "10vh",
  right: "10px",
  backgroundColor: "#F4F7FA",
  borderRadius: "8px",
  padding: "20px 40px",
  marginTop: "10px",
  zIndex: 10000,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};
