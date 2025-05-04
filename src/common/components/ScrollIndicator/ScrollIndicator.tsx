import { Box, Typography } from "@mui/material";
import { useRef, useEffect } from "react";
import {
  containerStyle,
  mouseStyle,
  dotStyle,
  labelStyle,
  textStyle,
} from "./ScrollIndicator.styles";

/**
 * Component for animation that indicates to scroll down.
 */
export default function ScrollIndicator({ scrolled }: { scrolled: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const yRef = useRef(10);
  const directionRef = useRef(1);

  /**
   * Create animation loop for the indicator.
   */
  useEffect(() => {
    const animate = () => {
      // speed
      yRef.current += directionRef.current * 0.3;

      // change direction if y position is at the top or at the bottom
      if (yRef.current > 30 || yRef.current < 10) {
        directionRef.current *= -1;
      }

      const progress = (yRef.current - 10) / 20;
      const opacity = directionRef.current > 0 ? 1.1 - progress * 0.9 : 0;

      // set position and opacity
      if (dotRef.current) {
        dotRef.current.style.top = `${yRef.current}px`;
        dotRef.current.style.opacity = `${opacity}`;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <Box sx={containerStyle}>
      <Box
        sx={{
          ...mouseStyle,
          opacity: !scrolled ? 0.75 : 0,
          visibility: scrolled ? "hidden" : "visible",
        }}
      >
        <Box ref={dotRef} sx={dotStyle} />
        <Box sx={labelStyle}>
          <Typography sx={textStyle}>Sensibilität</Typography>
          <Typography sx={textStyle}>schärfen</Typography>
        </Box>
      </Box>
    </Box>
  );
}
