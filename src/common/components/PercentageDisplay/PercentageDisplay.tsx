import { Box, SxProps, Typography } from "@mui/material";
import parliament_members from "../../../common/data/parliament_members_seats.json";
import { Distribution } from "../../constants";
import {
  containerStyles,
  labelTextStyles,
  percentageTextStyles,
  valueBoxStyles,
} from "./PercentageDisplay.styles";
import PartyLegend from "../PartyLegend/PartyLegend";

interface PercentageDisplayProps {
  percentage: number;
  label: string;
  showParliament?: boolean;
  index?: number;
  left?: boolean;
  sx?: SxProps;
  isTopicExploration?: boolean;
}

/**
 * Component for display of a given percentage value.
 */
export const PercentageDisplay = ({
  percentage,
  label,
  showParliament,
  index,
  left = true,
  sx,
  isTopicExploration,
}: PercentageDisplayProps) => {
  const parliaments = parliament_members.election_periods;
  const isNotWomanPerc =
    label !== "Weibliche Abgeordnete" &&
    label !== "Reden weiblicher Abgeordneter";
  return (
    <Box sx={{ ...containerStyles(!!isTopicExploration), ...sx } as SxProps}>
      {showParliament && isNotWomanPerc ? (
        <PartyLegend
          distribution={
            parliaments[index ?? -1]?.seats_distribution as Distribution
          }
        />
      ) : (
        <Box sx={valueBoxStyles(left)}>
          <Typography sx={percentageTextStyles} mb="1rem">
            {percentage + " %"}
          </Typography>
          <Typography
            variant="body2"
            sx={labelTextStyles(!!isTopicExploration)}
          >
            {label}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PercentageDisplay;
