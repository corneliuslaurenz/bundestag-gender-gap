import { SxProps } from "@mui/material";

export const overlayWrapperStyle: SxProps = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  zIndex: 99999,
  transform: "translateY(-100%)",
};

export const closeButtonStyle: SxProps = {
  position: "absolute",
  top: "16vh",
  right: "16vh",
  cursor: "pointer",
  zIndex: 100000,
  "@media (max-width: 950px)": {
    top: "9vh",
    right: "9vh",
  },
};

export const contentBoxStyle: SxProps = {
  width: "100vw",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  gap: "0",
  textAlign: "left",
  "@media (max-width: 950px)": {
    gap: ".5rem",
  },
};

export const innerContentBoxStyle: SxProps = {
  width: "100%",
  display: "flex",
  alignItems: "left",
  alignSelf: "center",
  flexDirection: "column",

  gap: "2rem",
  textAlign: "center",
  "@media (max-width: 950px)": {
    gap: ".5rem",
  },
};

export const headingStyle: SxProps = {
  fontSize: "3.5rem",
  fontFamily: '"Ubuntu", sans-serif',
  fontWeight: 500,
  color: "white",
  "@media (max-width: 1200px), (max-height: 800px)": {
    fontSize: "2.5rem",
  },
  "@media (max-width: 950px)": {
    fontSize: "2rem",
    marginBottom: "3.5vh",
  },
};

export const paragraphContainerStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",
  textAlign: "center",
  "@media (max-width: 950px)": {
    gap: ".5rem",
  },
};

export const dataNoticeButtonStyle: SxProps = {
  zIndex: 999,
  opacity: 0.8,
  cursor: "pointer",
  width: "200px",
  height: "32px",
  backgroundColor: "white",
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
  "@media (max-width: 950px)": {
    width: "280px",
  },
};

export const genderNoticeButtonStyle: SxProps = {
  zIndex: 999,
  opacity: 0.8,
  cursor: "pointer",
  width: "280px",
  height: "32px",
  backgroundColor: "white",
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

  "@media (max-width: 950px)": {
    marginLeft: "0",
    justifySelf: "anchor-center",
  },
};

export const generalInfoWrapperStyle: SxProps = {
  width: "62.5vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media (max-width: 950px)": {
    width: "100%",
  },
};

export const repoLinkStyles: SxProps = {
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  justifyContent: "center",
};

export const thesisWrapperStyles: SxProps = {
  width: "37.5vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const genderCommentStyles: SxProps = {
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
  flexDirection: "column",
  gap: "1rem",
  textAlign: "center",
  width: "60%",
  "@media (max-width: 950px)": {
    gap: ".5rem",
    width: "80%",
  },
};
