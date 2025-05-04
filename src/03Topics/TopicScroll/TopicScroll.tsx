import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useIsDesktop from "../../common/hooks/useIsDesktop";

interface TopicScrollProps {
  pinnedContainerRef: React.RefObject<HTMLDivElement | null>;
}

gsap.registerPlugin(ScrollTrigger);

/**
 * Component for the scroll animation of topics sliding horizontally across the screen.
 * Two rows of topics are sliding in opposite directions.
 */
const TopicScroll = ({ pinnedContainerRef }: TopicScrollProps) => {
  const scrollerTopRef = useRef<HTMLDivElement | null>(null);
  const scrollerBottomRef = useRef<HTMLDivElement | null>(null);

  // distinguish browsers that doesnt support webkit
  const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");
  const isIE = navigator.userAgent.toLowerCase().includes("msie");

  const isDesktop = useIsDesktop(950);

  /**
   * Animate text scroll.
   */
  useEffect(() => {
    if (
      !pinnedContainerRef.current ||
      !scrollerTopRef.current ||
      !scrollerBottomRef.current
    )
      return;

    // define width that needs to be scrolled to see everything
    const scrollLengthTop =
      (scrollerTopRef.current?.scrollWidth ?? 0) - window.innerWidth;
    const scrollLengthBottom =
      (scrollerBottomRef.current?.scrollWidth ?? 0) - window.innerWidth;
    const totalScrollLength = Math.max(scrollLengthTop, scrollLengthBottom);

    // define timeline
    // so that both texts will animate parallely
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedContainerRef.current,
        start: "top top",
        end: `+=${totalScrollLength}`,
        pin: true,
        pinnedContainer: pinnedContainerRef.current,
        pinSpacing: true,
        scrub: 2,
        invalidateOnRefresh: true,
      },
    });

    // animate both elements
    tl.fromTo(
      scrollerTopRef.current,
      { x: window.innerWidth * 0.9 },
      { x: -scrollLengthTop - window.innerWidth * 0.4, ease: "none" },
      0
    ).fromTo(
      scrollerBottomRef.current,
      { x: -scrollLengthBottom - window.innerWidth * 1.15 },
      { x: window.innerWidth * 0.2, ease: "none" },
      0
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [pinnedContainerRef]);

  const textStyles = (fontSize: string) => ({
    flexShrink: 0,
    fontSize,
    fontFamily: '"Ubuntu", sans-serif',
    fontWeight: 700,
    letterSpacing: 0.25,
    color: "#AC614A",
    "-webkit-text-stroke":
      !isFirefox && !isIE
        ? isDesktop
          ? "3.5px #744038"
          : "2.25px #744038"
        : "none",
    textShadow:
      isFirefox || isIE
        ? isDesktop
          ? "-2.75px -2.75px 0 #744038, 2.75px -2.75px 0 #744038, -2.75px 2.75px 0 #744038, 2.75px 2.75px 0 #744038"
          : "-1.5px -1.5px 0 #744038, 1.5px -1.5px 0 #744038, -1.5px 1.5px 0 #744038, 1.5px 1.5px 0 #744038"
        : "none",
    "@media (max-width: 1400px)": {
      fontSize: "8rem",
    },
    "@media (max-width: 1280px)": {
      fontSize: "6.5rem",
    },
    "@media (max-width: 950px)": {
      fontSize: "4.5rem",
    },
    "@media (max-width: 650px)": {
      fontSize: "2.5rem",
      textShadow:
        "-2px -2px 0 #744038, 2px -2px 0 #744038, -2px 2px 0 #744038, 2x 2px 0 #744038",
    },
    "@media (max-height: 800px) and (min-width: 950px)": {
      fontSize: "4.5rem",
    },
  });

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "4vh",
        padding: "4vh 10vw",
        "@media (max-width: 950px)": {
          gap: "10vh",
          padding: "10vh 10vw",
        },
      }}
    >
      {/* top row */}
      <Box
        ref={scrollerTopRef}
        sx={{
          display: "flex",
          gap: "8vw",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {[
          "GESELLSCHAFT",
          "WISSENSCHAFT",
          "SOZIALES",
          "KULTUR",
          "DIGITALISIERUNG",
          "BILDUNG",
          "UMWELT",
        ].map((topic, index) => (
          <Typography key={index} sx={textStyles("8.5rem")}>
            {topic}
          </Typography>
        ))}
      </Box>

      {/* bottom row */}
      <Box
        ref={scrollerBottomRef}
        sx={{
          display: "flex",
          gap: "8vw",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {[
          "WIRTSCHAFT",
          "SICHERHEIT",
          "AUSSENPOLITIK",
          "INFRASTRUKTUR",
          "ENERGIE",
          "GESUNDHEIT",
          "FINANZEN",
        ].map((topic, index) => (
          <Typography key={index} sx={textStyles("10rem")}>
            {topic}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default TopicScroll;
