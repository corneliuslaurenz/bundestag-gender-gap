import { useRef } from "react";
import { Box, Typography } from "@mui/material";
import TopicScroll from "./TopicScroll/TopicScroll";
import EqualitySpeechesDiagram from "./EqualitySpeechesDiagram/EqualitySpeechesDiagram";
import TopicsDistributionDiagram from "./TopicDistributionDiagram/TopicsDistributionDiagram";
import TopicExplorationDiagram from "./TopicsExplorationDiagram/TopicsExplorationDiagram";
import { wrapperSx, scrollWrapperSx, textBlockSx } from "./Topics.styles";

/**
 * Index component of 03Topics.
 */
const Topics = () => {
  const topicsRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <Box ref={topicsRef} sx={wrapperSx}>
        <Box sx={{ height: "84vh" }}>
          <Typography variant="subtitle2">Kapitel 03</Typography>
          <br />
          <Typography variant="subtitle1">Themen</Typography>
          <br />
          <Box sx={scrollWrapperSx}>
            <TopicScroll pinnedContainerRef={topicsRef} />
          </Box>
        </Box>
        <Box sx={textBlockSx}>
          <Typography variant="h1">Nur 8 % aller Reden</Typography>
          <Typography variant="h2">
            zum Thema Wirtschaft wurden von 1949 bis 2023 im Durchschnitt von
            Frauen gehalten.
          </Typography>
        </Box>
      </Box>

      <EqualitySpeechesDiagram />
      <TopicsDistributionDiagram />
      <TopicExplorationDiagram />
    </>
  );
};

export default Topics;
