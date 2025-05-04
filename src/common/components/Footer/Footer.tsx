import { Box, Link, Typography } from "@mui/material";
import useIsDesktop from "../../hooks/useIsDesktop";
import {
  wrapperStyle,
  innerBoxStyle,
  footerLinkStyle,
  hsdImageStyle,
  linkedinImageStyle,
} from "./Footer.styles";

type FooterProps = {
  isContactPage?: boolean;
};

/**
 * Component for footer with links to university and editors.
 */
const Footer = ({ isContactPage }: FooterProps) => {
  const isTablet = useIsDesktop(650);
  const isDesktop = useIsDesktop(950);

  return (
    <Box sx={wrapperStyle(isContactPage)}>
      <Box sx={innerBoxStyle(isContactPage, isTablet)}>
        <Link
          href="https://www.hs-duesseldorf.de/"
          target="_blank"
          rel="noopener noreferrer"
          sx={footerLinkStyle(isContactPage, isDesktop)}
        >
          <img src={"./images/hsd.png"} alt="hsd" style={hsdImageStyle} />
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                "@media (max-width: 1200px), (max-height: 800px)": {
                  fontSize: ".75rem",
                },
              }}
            >
              {isDesktop && !isContactPage ? (
                "Hochschule Düsseldorf"
              ) : (
                <>
                  Hochschule <br /> Düsseldorf
                </>
              )}
            </Typography>
          </Box>
        </Link>

        <Link
          href="https://de.linkedin.com/in/ana-calotescu"
          target="_blank"
          rel="noopener noreferrer"
          sx={footerLinkStyle(isContactPage, isDesktop)}
        >
          <img
            src={"./images/linkedin.png"}
            alt="li"
            style={linkedinImageStyle}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                "@media (max-width: 1200px), (max-height: 800px)": {
                  fontSize: ".75rem",
                },
              }}
            >
              {isDesktop && !isContactPage ? (
                "Ana Calotescu-Baluteanu"
              ) : (
                <>
                  Ana&nbsp;Calotescu- <br />
                  Baluteanu
                </>
              )}
            </Typography>
          </Box>
        </Link>

        <Link
          href="https://de.linkedin.com/in/cornelius-laurenz-753b7b243"
          target="_blank"
          rel="noopener noreferrer"
          sx={footerLinkStyle(isContactPage, isDesktop)}
        >
          <img
            src={"./images/linkedin.png"}
            alt="li"
            style={linkedinImageStyle}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                "@media (max-width: 1200px), (max-height: 800px)": {
                  fontSize: ".75rem",
                },
              }}
            >
              {isDesktop && !isContactPage ? (
                "Cornelius Laurenz"
              ) : (
                <>
                  Cornelius <br /> Laurenz
                </>
              )}
            </Typography>
          </Box>
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
