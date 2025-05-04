import { CSSProperties } from "react";
import { Box } from "@mui/material";
import { merkelContainerStyle, merkelImageStyle } from "./Merkel.styles";

/**
 * Component for full screen Merkel illustration.
 */
const Merkel = () => {
  return (
    <Box sx={merkelContainerStyle}>
      <img
        width="76%"
        height="auto"
        style={merkelImageStyle as CSSProperties}
        src={"./images/merkel.png"}
        alt="merkel"
      />
    </Box>
  );
};

export default Merkel;
