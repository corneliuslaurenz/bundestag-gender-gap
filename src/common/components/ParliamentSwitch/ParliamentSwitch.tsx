import { Box } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { WheelPicker } from "../WheelPicker/WheelPicker";
import useIsDesktop from "../../hooks/useIsDesktop";
import { wrapperStyles } from "./ParliamentSwitch.styles";

interface SettingsProps {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  parliaments: { start_year: number; end_year: number }[];
}

/**
 * Component for the parliament switch of Bundestag.
 */
export default function ParliamentSwitch({
  index,
  setIndex,
  parliaments,
}: SettingsProps) {
  const isDesktop = useIsDesktop(950);
  const isTablet = useIsDesktop(650);
  const isMobile = useIsDesktop(500);

  const data = parliaments.map(
    (val) => `${val.start_year} bis ${val.end_year}`
  );

  return (
    <Box sx={wrapperStyles}>
      <WheelPicker
        items={data}
        index={index}
        setIndex={setIndex}
        width={isDesktop ? 825 : isTablet ? 550 : isMobile ? 450 : 360}
      />
    </Box>
  );
}
