import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpeechesDiagram from "./SpeechesDiagram/SpeechesDiagram";
import Reactions from "./Reactions/Reactions";
import {
  bottomSectionStyles,
  headlineContainerStyles,
  illustrationContainerStyles,
  topSectionStyles,
  topTextContainerStyles,
} from "./Speeches.styles";
import Triangle from "../common/components/Triangle/Triangle";

gsap.registerPlugin(ScrollTrigger);

/**
 * Index component of 02Speeches.
 */
function Speeches() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // triangles for scroll animation
  // has to be defined inside this component because of useRef
  const triangles = [
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -900,
      y: 100,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 600,
      y: -350,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -450,
      y: 500,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -800,
      y: 700,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 500,
      y: -500,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -600,
      y: 600,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -200,
      y: 250,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 150,
      y: 350,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -550,
      y: 800,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -700,
      y: 400,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 450,
      y: -300,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -350,
      y: 200,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -900,
      y: 600,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: -150,
      y: -200,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -350,
      y: 500,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: 100,
      y: -400,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 300,
      y: 700,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -250,
      y: -500,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -500,
      y: 300,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 400,
      y: 800,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -300,
      y: -600,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: 1200,
      y: -850,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: -450,
      y: 200,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: 350,
      y: -550,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -300,
      y: 700,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 700,
      y: -100,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: 200,
      y: 1200,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -600,
      y: -400,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 900,
      y: 600,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -800,
      y: 300,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: 500,
      y: 0,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: -400,
      y: -800,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: 600,
      y: 1000,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: 1100,
      y: -150,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: -300,
      y: -200,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: 350,
      y: 800,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -500,
      y: 1000,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 200,
      y: -700,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -150,
      y: 500,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -400,
      y: 200,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 600,
      y: -500,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -900,
      y: 600,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: 300,
      y: -400,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: -200,
      y: 0,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: 700,
      y: -600,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: -100,
      y: 300,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: 500,
      y: 400,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: -350,
      y: 800,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#282D43",
      x: 800,
      y: -100,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#3C486C",
      x: -600,
      y: -500,
    },
    {
      ref: useRef<HTMLDivElement | null>(null),
      color: "#475486",
      x: 1200,
      y: 100,
    },
  ];

  /**
   * Animate triangles initially.
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=" + "500vh",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        pinnedContainer: containerRef.current,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress >= 1) {
            self.endAnimation();
          }
        },
      },
    });

    // animate every triangle
    triangles.forEach(({ ref, x, y }) => {
      if (ref.current) {
        timeline.to(
          ref.current,
          {
            x,
            y,
            opacity: 0.5,
          },
          0
        );
      }
    });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={topSectionStyles} ref={containerRef}>
        <Box sx={topTextContainerStyles}>
          <Typography variant="subtitle2">Kapitel 02</Typography>
          <br />
          <Typography variant="subtitle1">Reden</Typography>
        </Box>
        <Box sx={illustrationContainerStyles}>
          {triangles.map(({ ref, color }, index) => (
            <Triangle key={index} color={color} ref={ref} />
          ))}
          <img
            src={"./images/woman-shouting.svg"}
            width="100%"
            alt="Poster"
            style={{ zIndex: 10, position: "relative" }}
          />
        </Box>
      </Box>

      <Box sx={bottomSectionStyles}>
        <Box sx={headlineContainerStyles}>
          <Typography
            variant="h1"
            sx={{
              paddingTop: "46vh",
              "@media (max-height: 800px)": {
                paddingTop: "52vh",
              },
            }}
          >
            Nur 23 % aller Reden
          </Typography>
          <Typography variant="h2">
            wurden von 1949 bis 2023 im Durchschnitt von Frauen gehalten.
          </Typography>
        </Box>
        <Box mb={"20vh"}>
          <SpeechesDiagram />
        </Box>
        <Box mb={"20vh"}>
          <Reactions />
        </Box>
      </Box>
    </>
  );
}

export default Speeches;
