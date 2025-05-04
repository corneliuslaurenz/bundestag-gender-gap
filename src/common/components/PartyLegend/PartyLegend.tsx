import { Box, Typography } from "@mui/material";
import React from "react";
import { Distribution, Party } from "../../constants";
import { getColorForParty } from "../../utils";
import {
  legendWrapperStyles,
  legendItemStyles,
  nameColumnStyles,
  circleStyles,
  borderLineStyles,
} from "./PartyLegend.styles";

type PartyLegendProps = {
  distribution: Distribution;
};

/**
 * Component for the party legend if distribution of the parliament is shown.
 */
const PartyLegend = ({ distribution }: PartyLegendProps) => {
  const sortedEntries = Object.entries(distribution).sort(
    ([, seatsA = 0], [, seatsB = 0]) => seatsB - seatsA
  );

  return (
    <Box sx={legendWrapperStyles}>
      {sortedEntries.map(([party, seats], index) => (
        <React.Fragment key={party}>
          <Box sx={legendItemStyles}>
            <Box sx={nameColumnStyles}>
              <Typography
                variant="body2"
                sx={{ textAlign: "left", fontWeight: 600, display: "inline" }}
              >
                {party}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "left",
                  fontWeight: 600,
                  fontSize: ".75rem",
                  display: "inline",
                }}
              >
                {" • " + seats}
              </Typography>
            </Box>
            <Box sx={circleStyles(getColorForParty(party as Party))} />
          </Box>
          {index !== sortedEntries.length - 1 && <Box sx={borderLineStyles} />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default PartyLegend;
