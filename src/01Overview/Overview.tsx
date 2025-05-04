import { Box, Typography } from "@mui/material";
import { wrapperStyle, textBoxStyle } from "./Overview.styles";
import Merkel from "./Merkel/Merkel";
import Bundestag from "./Bundestag/Bundestag";
import WomanCountDiagram from "./WomanCountDiagram/WomanCountDiagram";

/**
 * Index component of 01Overview.
 */
function Overview() {
  return (
    <>
      <Box sx={wrapperStyle}>
        <Box sx={{ height: "82vh" }}>
          <Typography variant="subtitle2">Kapitel 01</Typography>
          <br />
          <Typography variant="subtitle1">Überblick</Typography>
        </Box>
        <Box sx={textBoxStyle}>
          <Typography variant="h1">Nur 19 % aller Abgeordneten</Typography>
          <Typography variant="h2">
            haben sich von 1949 bis 2023 im Durchschnitt als Frau identifiziert.
          </Typography>
        </Box>
      </Box>
      <Merkel />
      <WomanCountDiagram />
      <Bundestag />
    </>
  );
}

export default Overview;
