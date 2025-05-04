import { Box } from "@mui/material";
import { forwardRef } from "react";
import { triangleContainerStyles } from "./Triangle.styles";

/**
 * Component returns a triangle for animation.
 */
const Triangle = forwardRef<HTMLDivElement, { color: string }>(
  ({ color }, ref) => {
    return (
      <Box sx={triangleContainerStyles} ref={ref}>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <polygon points="35,70 100,35 35,0" fill={color} />
        </svg>
      </Box>
    );
  }
);

export default Triangle;
