import { Box, Switch, Typography } from "@mui/material";
import {
  wrapperStyles,
  innerRowStyles,
  labelTextStyles,
  labelWrapperStyles,
  outerBoxStyles,
} from "./Setting.styles";

interface SettingsProps {
  showSeatsView: boolean;
  setShowSeatsView: (val: boolean) => void;
  showImpression: boolean;
  setShowImpression: (val: boolean) => void;
}

/**
 * Component for Bundestag diagram settings.
 */
export default function Settings({
  showSeatsView,
  setShowSeatsView,
  showImpression,
}: SettingsProps) {
  return (
    <>
      <Box sx={wrapperStyles(showImpression)}>
        <Box sx={outerBoxStyles}>
          <Box sx={innerRowStyles}>
            <Box sx={labelWrapperStyles}>
              <img src={"./images/chair.svg"} width={"28px"} alt="Poster" />
              <Typography variant="body2" sx={labelTextStyles}>
                Sitzverteilung
              </Typography>
            </Box>
            <Switch onClick={() => setShowSeatsView(!showSeatsView)} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
