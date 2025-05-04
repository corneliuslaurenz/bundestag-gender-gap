import { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import election_periods from "../../data/parliament_members_seats.json";
import speeches_length from "../../data/speeches_length.json";
import useIsDesktop from "../../hooks/useIsDesktop";
import { ControlMode } from "../../constants";
import {
  buttonStyle,
  controlWrapperStyle,
  labelTypographyStyle,
  listContainerStyle,
  rowWrapperStyle,
  smallTextStyle,
  speechTextStyle,
  yearTextStyle,
} from "./SpeechControl.styles";
import useIsLargeHeight from "../../hooks/useIsLargeHeight";

interface SpeechLengthControlProps {
  setFemalePercentage: (value: number) => void;
  lineY1: number;
  lineY2: number;
  controlMode: ControlMode;
  selectedOption: number;
  setSelectedOption: (val: number) => void;
  setIndex: (val: number) => void;
}

interface SpeechesLength {
  text_length: number;
  percentage_woman_speeches: number;
  percentage_man_speeches: number;
}

interface SpeechesCount {
  number: number;
  total_woman_speeches: number;
  total_man_speeches: number;
  total_speeches: number;
  percentage_woman_speeches: number;
  percentage_man_speeches: number;
  start_year: number;
  end_year: number;
}

/**
 * Component for list to filter data for speeches diagram.
 */
const SpeechControl = ({
  setFemalePercentage,
  controlMode,
  selectedOption,
  setSelectedOption,
  setIndex,
}: SpeechLengthControlProps) => {
  const isDesktop = useIsDesktop(950);
  const isSmallHeight = !useIsLargeHeight(800);
  const listRef = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(0);

  const speeches_count = election_periods.election_periods;

  /**
   * Add resize event handler for responsiveness.
   */
  useEffect(() => {
    const onResize = () => {
      if (listRef.current && !isSmallHeight) {
        setListHeight(listRef.current.offsetHeight);
      }
    };

    onResize();

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [controlMode, isSmallHeight, selectedOption]);

  return (
    <>
      {isDesktop && !isSmallHeight && (
        <Box sx={controlWrapperStyle}>
          <Typography variant="body1" sx={labelTypographyStyle}>
            {controlMode !== ControlMode.SpeechesCount
              ? "Länge der Rede"
              : "Parlament"}
          </Typography>

          <Box sx={rowWrapperStyle}>
            <Box ref={listRef} sx={listContainerStyle}>
              {controlMode === ControlMode.SpeechesLength &&
                Object.values(speeches_length).map(
                  (value: SpeechesLength, index: number) => (
                    <Button
                      key={index}
                      onClick={() => {
                        setFemalePercentage(value.percentage_woman_speeches);
                        setSelectedOption(value?.text_length);
                      }}
                      sx={buttonStyle}
                    >
                      <Typography
                        sx={speechTextStyle(
                          selectedOption === value?.text_length
                        )}
                      >
                        {value?.text_length}
                      </Typography>
                      <Typography
                        sx={smallTextStyle(
                          selectedOption === value?.text_length
                        )}
                      >
                        Tausend
                      </Typography>
                      <Typography
                        sx={smallTextStyle(
                          selectedOption === value?.text_length
                        )}
                      >
                        Zeichen
                      </Typography>
                    </Button>
                  )
                )}

              {controlMode === ControlMode.SpeechesCount &&
                speeches_count.map((value: SpeechesCount, index: number) => (
                  <Button
                    key={index}
                    onClick={() => {
                      setFemalePercentage(
                        Math.round(value?.percentage_woman_speeches ?? 0)
                      );
                      setSelectedOption(value?.start_year);
                      setIndex(index);
                    }}
                  >
                    <Typography
                      sx={yearTextStyle(selectedOption === value?.start_year)}
                    >
                      {value?.start_year}
                    </Typography>
                  </Button>
                ))}
            </Box>

            <svg height={listHeight} width="2rem">
              <line
                x1="10"
                y1="0"
                x2="10"
                y2={listHeight}
                stroke="white"
                strokeWidth="4"
              />
              <polygon points={`0,0 20,0 10,15`} fill="white" />
              <polygon
                points={`0,${listHeight} 20,${listHeight} 10,${
                  listHeight - 15
                }`}
                fill="white"
              />
            </svg>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SpeechControl;
