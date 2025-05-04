import Bars from "../../common/components/Bars/Bars";
import { Box, Typography } from "@mui/material";
import Reactionsdiagram from "./ReactionsDiagram.tsx/ReactionsDiagram";
import {
  bottomBoxStyle,
  bottomBoxWrapperStyle,
  wrapperStyle,
  contentBoxStyle,
} from "./Reactions.styles";
import { h1AlternativeStyle } from "../../03Topics/TopicDistributionDiagram/TopicsDistributionDiagram.styles";

/**
 * Component for speeches reactions section.
 */
const Reactions = () => {
  return (
    <>
      <Box sx={wrapperStyle}>
        <Bars />
        <Box sx={contentBoxStyle}>
          <Typography variant="h2">Reaktionen auf Reden</Typography>
          <Typography variant="h1" sx={h1AlternativeStyle}>
            Frauen-Reden <br />
            uninteressant?
          </Typography>
        </Box>

        <Reactionsdiagram />

        <Box sx={bottomBoxWrapperStyle}>
          <Box sx={bottomBoxStyle}>
            <Typography variant="h2">
              Frauen-Reden also uninteressant?
            </Typography>
            <Typography variant="h1" sx={h1AlternativeStyle}>
              Mit Sicherheit <br /> nicht!
            </Typography>
            <Typography variant="h2">
              Jedoch zeigt sich der Trend, dass Reaktionen auf Reden männlicher
              Abgeordneter stets häufiger auftreten.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Reactions;
