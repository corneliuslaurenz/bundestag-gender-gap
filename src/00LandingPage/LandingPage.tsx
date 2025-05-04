import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  wrapperStyle,
  textContainerStyle,
  womanImageStyle,
  rectangleImageStyle,
  tableImageStyle,
  subheadlineStyle,
  headlineStyle,
  textWrapperStyle,
} from "./LandingPage.styles";
import ScrollIndicator from "../common/components/ScrollIndicator/ScrollIndicator";
import useIsDesktop from "../common/hooks/useIsDesktop";
import useIsLargeHeight from "../common/hooks/useIsLargeHeight";

gsap.registerPlugin(ScrollTrigger);

/**
 * Landing page of the application.
 */
function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const refText = useRef<HTMLElement | null>(null);
  const refWoman = useRef<HTMLImageElement | null>(null);
  const refTable = useRef<HTMLImageElement | null>(null);
  const refRectangle = useRef<HTMLImageElement | null>(null);
  const refContainer = useRef<HTMLDivElement | null>(null);

  const isDesktop = useIsDesktop(950);
  const isLargeHeight = useIsLargeHeight(800);

  /**
   * Add scroll event listener to show scroll indicator.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // function to animate gsap elements
  const animateElement = (
    element: React.RefObject<HTMLElement>,
    yOffset: number,
    duration: number
  ) => {
    gsap.fromTo(
      element.current,
      { y: 0, opacity: 1 },
      {
        y: yOffset,
        opacity: 1,
        duration,
        scrollTrigger: {
          trigger: refContainer.current,
          start: "top top",
          end: "200% top",
          scrub: true,
        },
      }
    );
  };

  /**
   * Initiallay: Set animations for parallax scrolling animation.
   */
  useEffect(() => {
    if (
      !refContainer.current ||
      !refText.current ||
      !refWoman.current ||
      !refTable.current ||
      !refRectangle.current
    )
      animateElement(refText as React.RefObject<HTMLElement>, 500, 0.5);
    animateElement(
      refWoman as React.RefObject<HTMLElement>,
      isDesktop ? 400 : 100,
      0.5
    );
    animateElement(
      refRectangle as React.RefObject<HTMLElement>,
      isDesktop ? 520 : 115,
      0.5
    );
    animateElement(
      refTable as React.RefObject<HTMLElement>,
      isDesktop ? 680 : 210,
      0.5
    );
  }, [isDesktop]);

  return (
    <>
      <Box sx={wrapperStyle} ref={refContainer}>
        <Box sx={textWrapperStyle} ref={refText}>
          <Box sx={textContainerStyle}>
            <Typography mb="2vh" sx={headlineStyle}>
              Frauen im Deutschen Bundestag
            </Typography>
            <Typography sx={subheadlineStyle}>1949 bis 2023</Typography>
            {isLargeHeight && <ScrollIndicator scrolled={scrolled} />}
          </Box>
        </Box>
        <Box sx={rectangleImageStyle}>
          <img
            width={"100%"}
            ref={refRectangle}
            src={"./images/start-rectangle.svg"}
            alt="Poster"
            style={{ willChange: "transform" }}
          />
        </Box>
        <Box sx={tableImageStyle}>
          <img
            width={"100%"}
            ref={refTable}
            src={"./images/start-table.svg"}
            alt="Poster"
            style={{ willChange: "transform" }}
          />
        </Box>
        <Box sx={womanImageStyle}>
          <img
            width={"100%"}
            ref={refWoman}
            src={"./images/start-woman.svg"}
            alt="Poster"
            style={{ willChange: "transform" }}
          />
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
