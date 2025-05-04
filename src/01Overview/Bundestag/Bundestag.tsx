import { useState } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import parliament_members from "../../common/data/parliament_members_seats.json";
import ParliamentSwitch from "../../common/components/ParliamentSwitch/ParliamentSwitch";
import Settings from "./Settings/Settings";
import useIsDesktop from "../../common/hooks/useIsDesktop";
import PercentageDisplay from "../../common/components/PercentageDisplay/PercentageDisplay";
import { ArcDiagram } from "../../common/components/Arcs/ArcDiagramm";
import {
  wrapperStyles,
  headerContainerStyles,
  titleContainerStyles,
  titleStyles,
  diagramContainerStyles,
  desktopBoxStyles,
  arcDiagramContainerStyles,
  rotatedBoxStyles,
  displayContainerStyles,
  headerBoxStyles,
} from "./Bundestag.styles";
import MultiArcDiagram from "../../common/components/Arcs/MultiArcDiagram";
import { Distribution, SingleParliament } from "../../common/constants";

gsap.registerPlugin(ScrollTrigger);

/**
 * Component for interactive Bundestag diagram.
 */
const Bundestag = () => {
  const [index, setIndex] = useState(0);
  const [showSeatsView, setShowSeatsView] = useState(false);
  const [showImpression, setShowImpression] = useState(false);
  const isDesktop = useIsDesktop(950);
  const parliaments = parliament_members.election_periods as SingleParliament[];

  return (
    <Box sx={wrapperStyles}>
      <Box sx={headerContainerStyles(showImpression)}>
        <Box sx={headerBoxStyles(showImpression)}>
          <Box sx={titleContainerStyles}>
            <Typography sx={titleStyles}>Der Deutsche Bundestag</Typography>
          </Box>
          <ParliamentSwitch
            index={index}
            setIndex={setIndex}
            parliaments={parliaments}
          />
          <Settings
            showSeatsView={showSeatsView}
            setShowSeatsView={setShowSeatsView}
            showImpression={showImpression}
            setShowImpression={setShowImpression}
          />
        </Box>
      </Box>
      <Box sx={diagramContainerStyles(showImpression)}>
        {isDesktop && (
          <Box sx={desktopBoxStyles}>
            <PercentageDisplay
              percentage={Math.round(
                100 - parliaments[index].percentage_of_women
              )}
              label={"Männliche Abgeordnete"}
              showParliament={showSeatsView}
              index={index}
              left
            />
          </Box>
        )}
        <Box sx={arcDiagramContainerStyles}>
          <Box sx={rotatedBoxStyles}>
            {showSeatsView ? (
              <MultiArcDiagram
                distribution={
                  parliaments[index].seats_distribution as Distribution
                }
              />
            ) : (
              <ArcDiagram
                womanPercentage={Math.round(
                  parliaments[index].percentage_of_women
                )}
              />
            )}
          </Box>
        </Box>
        <Box sx={displayContainerStyles}>
          {!isDesktop && (
            <PercentageDisplay
              percentage={Math.round(
                100 - parliaments[index].percentage_of_women
              )}
              label={"Männliche Abgeordnete"}
              showParliament={showSeatsView}
              index={index}
              left
            />
          )}
          <PercentageDisplay
            percentage={Math.round(parliaments[index].percentage_of_women)}
            label={"Weibliche Abgeordnete"}
            showParliament={showSeatsView}
            left={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Bundestag;
