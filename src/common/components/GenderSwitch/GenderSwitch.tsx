import { Box, Typography, IconButton, Switch } from "@mui/material";
import useIsDesktop from "../../hooks/useIsDesktop";
import { SortingOrder } from "../../constants";
import {
  genderSwitchWrapper,
  innerRightControls,
  leftSideBox,
  rightSideBox,
} from "./GenderSwitch.styles";

/**
 * Component for controlling gender you want to filter.
 */
const GenderSwitch = ({
  isWoman,
  setIsWoman,
  sorting,
  setSorting,
}: {
  isWoman: boolean;
  setIsWoman: (val: boolean) => void;
  sorting: SortingOrder;
  setSorting: (val: SortingOrder) => void;
}) => {
  const isDesktop = useIsDesktop(950);

  return (
    <Box sx={genderSwitchWrapper}>
      <Box sx={leftSideBox(isDesktop)}>
        <Typography variant="body2">Sortierung</Typography>
        <IconButton
          onClick={() =>
            setSorting(
              sorting === SortingOrder.Asc
                ? SortingOrder.Desc
                : SortingOrder.Asc
            )
          }
        >
          <img
            width={"100%"}
            src={
              sorting === SortingOrder.Asc
                ? "./images/sort-ascending.svg"
                : "./images/sort-descending.svg"
            }
            alt="Poster"
          />
        </IconButton>
      </Box>

      {isDesktop && (
        <img
          src={
            isWoman ? "./images/gender-female.svg" : "./images/gender-male.svg"
          }
          alt="Poster"
        />
      )}

      <Box sx={rightSideBox(isDesktop)}>
        <Box sx={innerRightControls}>
          <Typography variant="body2">Frauen</Typography>
          <Switch
            checked={!isWoman}
            onChange={() => setIsWoman(!isWoman)}
            sx={{
              ".Mui-checked.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#F4F7FA",
                opacity: 0.9,
              },
            }}
          />
          <Typography variant="body2">Männer</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GenderSwitch;
