import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import {
  burgerMenuContentStyle,
  burgerMenuWrapperStyle,
  menuFontStyles,
  menuItemStyle,
  menuLeftStyle,
  menuRightStyle,
  menuWrapperStyle,
} from "./Menu.styles";
import gsap from "gsap";
import useIsDesktop from "../../hooks/useIsDesktop";

/**
 * Component for the fixed menu at the top of the page.
 */
const Menu = ({
  setAboutPageIsOpen,
  setGenderCommentOpen,
  setDataCommentOpen,
  setContactPageIsOpen,
  overviewIsActive,
  speechesIsActive,
  topicsIsActive,
}: {
  setAboutPageIsOpen: (val: boolean) => void;
  setDataCommentOpen: (val: boolean) => void;
  setGenderCommentOpen: (val: boolean) => void;
  setContactPageIsOpen: (val: boolean) => void;
  overviewIsActive: boolean;
  speechesIsActive: boolean;
  topicsIsActive: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useIsDesktop(950);
  // click on menu button -> navigate to section via automatic scroll
  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      gsap.to(window, { duration: 1, scrollTo: target });
    }
  };

  return (
    <>
      {isDesktop ? (
        <Box sx={menuWrapperStyle}>
          <Box sx={menuLeftStyle}>
            <Box
              sx={menuItemStyle(
                overviewIsActive && !speechesIsActive && !topicsIsActive
              )}
              onClick={() => {
                scrollToSection("overview");
                setGenderCommentOpen(false);
                setDataCommentOpen(false);
                setAboutPageIsOpen(false);
                setContactPageIsOpen(false);
              }}
            >
              <Typography className="menuText" sx={menuFontStyles}>
                Überblick
              </Typography>
            </Box>
            <Box
              sx={menuItemStyle(speechesIsActive && !topicsIsActive)}
              onClick={() => {
                scrollToSection("speeches");
                setGenderCommentOpen(false);
                setDataCommentOpen(false);
                setAboutPageIsOpen(false);
                setContactPageIsOpen(false);
              }}
            >
              <Typography className="menuText" sx={menuFontStyles}>
                Reden
              </Typography>
            </Box>
            <Box
              sx={menuItemStyle(topicsIsActive)}
              onClick={() => {
                scrollToSection("topics");
                setGenderCommentOpen(false);
                setDataCommentOpen(false);
                setAboutPageIsOpen(false);
                setContactPageIsOpen(false);
              }}
            >
              <Typography className="menuText" sx={menuFontStyles}>
                Themen
              </Typography>
            </Box>
          </Box>
          <Box sx={menuRightStyle}>
            <Box
              sx={menuItemStyle()}
              onClick={() => {
                setAboutPageIsOpen(true);
                setGenderCommentOpen(false);
                setDataCommentOpen(false);
                setContactPageIsOpen(false);
              }}
            >
              <Typography className="menuText" sx={menuFontStyles}>
                Über
              </Typography>
            </Box>
            <Box
              sx={menuItemStyle()}
              onClick={() => {
                setGenderCommentOpen(false);
                setDataCommentOpen(false);
                setAboutPageIsOpen(false);
                setContactPageIsOpen(true);
              }}
            >
              <Typography className="menuText" sx={menuFontStyles}>
                Kontakt
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={burgerMenuWrapperStyle}>
            <IconButton onClick={() => setOpen(!open)}>
              {open ? (
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="3" x2="18" y2="18" />
                  <line x1="3" y1="18" x2="18" y2="3" />
                </svg>
              ) : (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </IconButton>
          </Box>

          {open && (
            <Box sx={burgerMenuContentStyle}>
              <Typography
                sx={{ ...menuFontStyles, color: "#3C486C" }}
                onClick={() => {
                  setOpen(!open);
                  scrollToSection("overview");
                  setGenderCommentOpen(false);
                  setAboutPageIsOpen(false);
                  setDataCommentOpen(false);
                  setContactPageIsOpen(false);
                }}
              >
                Überblick
              </Typography>
              <Typography
                sx={{ ...menuFontStyles, color: "#3C486C" }}
                onClick={() => {
                  setOpen(!open);
                  scrollToSection("speeches");
                  setGenderCommentOpen(false);
                  setDataCommentOpen(false);
                  setAboutPageIsOpen(false);
                  setContactPageIsOpen(false);
                }}
              >
                Reden
              </Typography>
              <Typography
                sx={{ ...menuFontStyles, color: "#3C486C" }}
                onClick={() => {
                  setOpen(!open);
                  scrollToSection("topics");
                  setGenderCommentOpen(false);
                  setAboutPageIsOpen(false);
                  setDataCommentOpen(false);
                  setContactPageIsOpen(false);
                }}
              >
                Themen
              </Typography>
              <Typography
                sx={{ ...menuFontStyles, color: "#3C486C" }}
                onClick={() => {
                  setAboutPageIsOpen(true);
                  setGenderCommentOpen(false);
                  setDataCommentOpen(false);
                  setContactPageIsOpen(false);
                }}
              >
                Über
              </Typography>
              <Typography
                sx={{ ...menuFontStyles, color: "#3C486C" }}
                onClick={() => {
                  setGenderCommentOpen(false);
                  setAboutPageIsOpen(false);
                  setDataCommentOpen(false);
                  setContactPageIsOpen(true);
                }}
              >
                Kontakt
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Menu;
