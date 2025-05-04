import { useEffect, useRef, useState } from "react";
import { Box, Link, SxProps, Typography } from "@mui/material";
import gsap from "gsap";
import { menuFontStyles } from "../common/components/Menu/Menu.styles";
import {
  overlayWrapperStyle,
  closeButtonStyle,
  contentBoxStyle,
  innerContentBoxStyle,
  headingStyle,
  paragraphContainerStyle,
  genderNoticeButtonStyle,
  generalInfoWrapperStyle,
  repoLinkStyles,
  thesisWrapperStyles,
  genderCommentStyles,
  dataNoticeButtonStyle,
} from "./AboutPage.styles";
import Footer from "../common/components/Footer/Footer";
import useIsDesktop from "../common/hooks/useIsDesktop";

/**
 *  Component for page with information about the application, contact data, data note and gender note.
 */
function AboutPage({
  aboutPageIsOpen,
  setAboutPageIsOpen,
  genderCommentOpen,
  setGenderCommentOpen,
  dataCommentOpen,
  setDataCommentOpen,
  contactPageIsOpen,
  setContactPageIsOpen,
}: {
  aboutPageIsOpen: boolean;
  setAboutPageIsOpen: (val: boolean) => void;
  genderCommentOpen: boolean;
  dataCommentOpen: boolean;
  setDataCommentOpen: (val: boolean) => void;
  setGenderCommentOpen: (val: boolean) => void;
  contactPageIsOpen: boolean;
  setContactPageIsOpen: (val: boolean) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [anyIsOpen, setAnyIsOpen] = useState(false);
  const isDesktop = useIsDesktop(950);

  /**
   * Animate whole page.
   * Slides down if it will opened, otherwise it slides up.
   */
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    if (anyIsOpen) {
      // open
      gsap.to(box, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // set background to plain color or two colors
      // depending on opened section
      if (
        aboutPageIsOpen &&
        !genderCommentOpen &&
        !dataCommentOpen &&
        !contactPageIsOpen
      ) {
        gsap.to(box, {
          backgroundImage: `linear-gradient(to right, #3C486C ${
            isDesktop ? " 62.5%" : "100%"
          }, #282D43 ${isDesktop ? "37.5%" : "0%"})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          duration: 0.5,
          ease: "power2.out",
        });
      } else if (genderCommentOpen || dataCommentOpen || contactPageIsOpen) {
        gsap.to(box, {
          backgroundImage: `linear-gradient(to right, #282D43 0%, #282D43 0%)`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    } else {
      // close
      gsap.to(box, {
        y: "-100%",
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [
    anyIsOpen,
    aboutPageIsOpen,
    genderCommentOpen,
    contactPageIsOpen,
    isDesktop,
    dataCommentOpen,
  ]);

  /**
   * Set any is open.
   */
  useEffect(() => {
    if (
      aboutPageIsOpen ||
      contactPageIsOpen ||
      genderCommentOpen ||
      dataCommentOpen
    ) {
      setAnyIsOpen(true);
    } else {
      setAnyIsOpen(false);
    }
  }, [aboutPageIsOpen, contactPageIsOpen, dataCommentOpen, genderCommentOpen]);

  /**
   * Set states to false with a little timeout.
   */
  useEffect(() => {
    if (!anyIsOpen) {
      setTimeout(() => {
        setAboutPageIsOpen(false);
        setContactPageIsOpen(false);
        setGenderCommentOpen(false);
        setDataCommentOpen(false);
      }, 500);
    }
  }, [
    anyIsOpen,
    setAboutPageIsOpen,
    setContactPageIsOpen,
    setDataCommentOpen,
    setGenderCommentOpen,
  ]);

  return (
    <Box
      ref={boxRef}
      sx={{
        ...overlayWrapperStyle,
      }}
    >
      {/* close icon */}
      <Box sx={closeButtonStyle} onClick={() => setAnyIsOpen(false)}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </Box>

      <Box sx={contentBoxStyle}>
        {aboutPageIsOpen && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box sx={generalInfoWrapperStyle}>
              <Box
                sx={{
                  ...innerContentBoxStyle,
                  alignSelf: "center",
                  width: isDesktop ? "60%" : "74%",
                }}
              >
                <Typography sx={headingStyle}>Über</Typography>

                <Box sx={paragraphContainerStyle}>
                  <Typography
                    mb=".5rem"
                    variant="body2"
                    sx={{
                      lineHeight: 1.75,
                      "@media (max-width: 1200px), (max-height: 800px)": {
                        fontSize: ".75rem",
                      },
                    }}
                  >
                    Diese Webanwendung ist im Rahmen einer Bachelorarbeit an der
                    Hochschule Düsseldorf entstanden und visualisiert Daten zur
                    Geschlechtergleichstellung von 1949 bis 2023. Die
                    dargestellten Daten entstammen einer Masterarbeit, welche
                    ebenfalls an der Hochschule Düsseldorf eingereicht wurde.
                  </Typography>

                  {!isDesktop && (
                    <>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.75,
                          fontWeight: 600,
                          width: "100%",
                          "@media (max-width: 1200px), (max-height: 800px)": {
                            fontSize: ".75rem",
                          },
                        }}
                      >
                        NLP-Analyse: Ana Calotescu-Baluteanu
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.75,
                          fontWeight: 600,
                          width: "100%",
                          "@media (max-width: 1200px), (max-height: 800px)": {
                            fontSize: ".75rem",
                          },
                        }}
                      >
                        Design und Entwicklung: Cornelius Laurenz
                      </Typography>
                    </>
                  )}

                  {isDesktop && (
                    <Typography
                      variant="body2"
                      mb="1rem"
                      sx={{
                        lineHeight: 1.75,
                        "@media (max-width: 1200px), (max-height: 800px)": {
                          fontSize: ".75rem",
                        },
                      }}
                    >
                      Aufgrund ihrer historischen Entstehung sind die
                      zugrundeliegenden Daten teils lückenhaft. Da die
                      durchgeführte Analyse eben diese Daten verwendete, ist ein
                      kritischer Umgang mit den präsentierten Daten zwingend
                      notwendig (siehe Einordnung der Daten).
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ lineHeight: 1.75 }}>
                    <Link
                      href="https://github.com/Ana287/nlp-bundestag-speeches"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={repoLinkStyles}
                    >
                      <img
                        src={"./images/github-mark-white.svg"}
                        alt="hsd"
                        style={{ height: "24px" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.75,
                          "@media (max-width: 1200px), (max-height: 800px)": {
                            fontSize: ".75rem",
                          },
                        }}
                      >
                        {isDesktop
                          ? "Hier gehts zum Github-Repository"
                          : "Github-Repository"}
                      </Typography>
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
            {isDesktop && (
              <Box sx={thesisWrapperStyles}>
                <Box
                  sx={{
                    ...innerContentBoxStyle,
                    alignSelf: "center",
                    width: isDesktop ? "60%" : "74%",
                    justifySelf: "center",
                  }}
                >
                  <Box sx={{ ...paragraphContainerStyle, textAlign: "left" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.75,
                        fontWeight: 600,
                        width: "100%",
                        "@media (max-width: 1200px), (max-height: 800px)": {
                          fontSize: ".75rem",
                        },
                      }}
                    >
                      NLP-Analyse: <br /> Ana Calotescu-Baluteanu
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.75,
                        "@media (max-width: 1200px), (max-height: 800px)": {
                          fontSize: ".75rem",
                        },
                      }}
                    >
                      Masterarbeit: „Eine NLP-Analyse parlamentarischer Reden im
                      Deutschen Bundestag von 1949 bis 2023 in Bezug auf
                      Gleichberechtigung und Frauenpolitik“
                    </Typography>
                  </Box>
                  <Box sx={{ ...paragraphContainerStyle, textAlign: "left" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.75,
                        fontWeight: 600,
                        width: "100%",
                        "@media (max-width: 1200px), (max-height: 800px)": {
                          fontSize: ".75rem",
                        },
                      }}
                    >
                      Design und Entwicklung: <br />
                      Cornelius Laurenz
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1.75,
                        "@media (max-width: 1200px), (max-height: 800px)": {
                          fontSize: ".75rem",
                        },
                      }}
                    >
                      Bachelorarbeit: „Frauen im Deutschen Bundestag von 1949
                      bis heute: Entwicklung einer Webanwendung zur
                      Visualisierung einer NLP-Analyse parlamentarischer Reden
                      in Bezug auf Geschlechtergleichstellung“
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        )}
        <Box sx={innerContentBoxStyle}>
          {contactPageIsOpen && (
            <>
              <Typography sx={headingStyle}>Kontakt</Typography>
              <Box sx={paragraphContainerStyle}>
                <Footer isContactPage />
              </Box>
            </>
          )}

          {genderCommentOpen && (
            <>
              <Typography sx={headingStyle}>Hinweis</Typography>
              <Box sx={genderCommentStyles}>
                <Typography
                  mb="4vh"
                  variant="body2"
                  sx={{
                    lineHeight: 1.75,
                    "@media (max-width: 1200px), (max-height: 800px)": {
                      fontSize: ".75rem",
                    },
                  }}
                >
                  Da in den vorliegenden Daten zum Deutschen Bundestag lediglich
                  Frauen und Männer abgebildet werden, stellt diese Webanwendung
                  diese Daten unverändert dar. Unabhängig davon richtet sich
                  diese Applikation an Menschen aller Geschlechter und ruft zu
                  Akzeptanz in der Gesellschaft und einem offenen Umgang mit
                  Personen jeglicher Identitäten auf.
                </Typography>
              </Box>
            </>
          )}

          {dataCommentOpen && (
            <>
              <Typography sx={headingStyle}>Einordnung der Daten</Typography>
              <Box sx={genderCommentStyles}>
                <Typography
                  mb="4vh"
                  variant="body2"
                  sx={{
                    lineHeight: 1.75,
                    "@media (max-width: 1200px), (max-height: 800px)": {
                      fontSize: ".75rem",
                    },
                  }}
                >
                  Die Analysegrundlage besteht aus Daten zu Bundestagsreden von
                  1949 bis Juni 2023, während die Sitzverteilungen der
                  offiziellen Website der Bundeswahlleiterin entnommen wurden.
                  {isDesktop && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  Das Geschlecht der Abgeordneten konnte größtenteils zugeordnet
                  werden. Aufgrund der zunehmenden Anzahl an weiblichen
                  Abgeordneten, wird in den frühen Jahrzehnten des Deutschen
                  Bundestags auf eine verminderte Datenlage zurückgegriffen.
                  Zudem fehlen Daten in wenigen Jahren, weshalb dies bei der
                  Betrachtung der Analyseergebnisse zu beachten ist. Da die
                  Anzahlen von Reaktionen pro Rede bei Frauen und Männern sehr
                  nah beieinanderliegen, lässt sich lediglich von einem zu
                  erkennenden Trend sprechen.
                </Typography>
              </Box>
            </>
          )}
        </Box>
        <Box
          sx={{
            position: "fixed",
            left: "4rem",
            bottom: "6vh",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "20px",
            flexDirection: "row",
            "@media (max-width: 950px)": {
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              left: "0",
            },
          }}
        >
          <Box
            sx={
              {
                ...genderNoticeButtonStyle,
              } as SxProps
            }
            onClick={() => {
              setAboutPageIsOpen(false);
              setContactPageIsOpen(false);
              setDataCommentOpen(false);
              setGenderCommentOpen(true);
            }}
          >
            <Typography className="menuText" sx={menuFontStyles}>
              Hinweis zur Geschlechtervielfalt
            </Typography>
          </Box>
          <Box
            sx={
              {
                ...dataNoticeButtonStyle,
              } as SxProps
            }
            onClick={() => {
              setAboutPageIsOpen(false);
              setContactPageIsOpen(false);
              setDataCommentOpen(true);
              setGenderCommentOpen(false);
            }}
          >
            <Typography className="menuText" sx={menuFontStyles}>
              Einordnung der Daten
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutPage;
