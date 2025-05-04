import { useCallback, useEffect, useRef, useState } from "react";
import { select, range, easeCubicOut } from "d3";
import { Box, Switch, Typography } from "@mui/material";
import election_periods from "../../common/data/parliament_members_seats.json";
import speeches_length from "../../common/data/speeches_length.json";
import SpeechControl from "../../common/components/SpeechControl/SpeechControl";
import useIsDesktop from "../../common/hooks/useIsDesktop";
import { WheelPicker } from "../../common/components/WheelPicker/WheelPicker";
import { ControlMode, SingleParliament } from "../../common/constants";
import {
  innerWrapperStyle,
  contentBoxStyle,
  mainTitleStyle,
  wrapperStyle,
  subtitleStyle,
  svgContainerStyle,
  svgStyle,
  switchRowStyle,
  topSectionStyle,
  wheelPickerContainerStyle,
} from "./SpeechesDiagramm.styles";
import useIsLargeHeight from "../../common/hooks/useIsLargeHeight";

interface SpeechesData {
  text_length: number;
  percentage_woman_speeches: number;
  percentage_man_speeches: number;
}

/**
 * Component for interactive speeches diagram.
 * Can be filtered by length of speeches and number of speeches (per parliament).
 */
const SpeechesDiagram = () => {
  const [femalePercentage, setFemalePercentage] = useState(2);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [controlMode, setControlMode] = useState(ControlMode.SpeechesCount);
  const [index, setIndex] = useState(0);
  const speeches_count = election_periods.election_periods;
  const [selectedOption, setSelectedOption] = useState(
    speeches_count[0]?.start_year
  );

  // define selectable options
  const countOptions = speeches_count.map((val) => {
    return `${(val as unknown as SingleParliament).start_year}`;
  });
  const lengthOptions = speeches_length.map((val: SpeechesData) => {
    return `${val?.text_length}`;
  });

  const isSmallHeight = !useIsLargeHeight(800);
  const isDesktop = useIsDesktop(950);
  const isTablet = useIsDesktop(650);
  const isLargerMobile = useIsDesktop(400);
  const isLargeScreen = useIsDesktop(1400);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // person icon with lectern
  const topPath =
    "M49.5 37.125C54.4231 37.125 59.1445 35.1693 62.6257 31.6882C66.1068 28.207 68.0625 23.4856 68.0625 18.5625C68.0625 13.6394 66.1068 8.91797 62.6257 5.43683C59.1445 1.95569 54.4231 0 49.5 0C44.5769 0 39.8555 1.95569 36.3743 5.43683C32.8932 8.91797 30.9375 13.6394 30.9375 18.5625C30.9375 23.4856 32.8932 28.207 36.3743 31.6882C39.8555 35.1693 44.5769 37.125 49.5 37.125ZM24.75 83.5312V188.719C24.75 191.18 25.7278 193.541 27.4684 195.282C29.209 197.022 31.5697 198 34.0312 198C36.4928 198 38.8535 197.022 40.5941 195.282C42.3347 193.541 43.3125 191.18 43.3125 188.719V129.938C43.3125 128.296 43.9644 126.723 45.1248 125.562C46.2852 124.402 47.859 123.75 49.5 123.75C51.141 123.75 52.7148 124.402 53.8752 125.562C55.0356 126.723 55.6875 128.296 55.6875 129.938V188.719C55.6875 191.18 56.6653 193.541 58.4059 195.282C60.1465 197.022 62.5072 198 64.9688 198C67.4303 198 69.791 197.022 71.5316 195.282C73.2722 193.541 74.25 191.18 74.25 188.719V83.5312C74.25 82.7107 74.5759 81.9238 75.1561 81.3436C75.7363 80.7634 76.5232 80.4375 77.3438 80.4375C78.1643 80.4375 78.9512 80.7634 79.5314 81.3436C80.1116 81.9238 80.4375 82.7107 80.4375 83.5312V114.469C80.4375 116.93 81.4153 119.291 83.1559 121.032C84.8965 122.772 87.2572 123.75 89.7188 123.75C92.1803 123.75 94.541 122.772 96.2816 121.032C98.0222 119.291 99 116.93 99 114.469V80.4375C99 70.5913 95.0886 61.1484 88.1263 54.1862C81.1641 47.2239 71.7212 43.3125 61.875 43.3125H37.125C27.2788 43.3125 17.8359 47.2239 10.8737 54.1862C3.91137 61.1484 0 70.5913 0 80.4375V114.469C0 116.93 0.977842 119.291 2.71841 121.032C4.45899 122.772 6.81971 123.75 9.28125 123.75C11.7428 123.75 14.1035 122.772 15.8441 121.032C17.5847 119.291 18.5625 116.93 18.5625 114.469V83.5312C18.5625 82.7107 18.8884 81.9238 19.4686 81.3436C20.0488 80.7634 20.8357 80.4375 21.6562 80.4375C22.4768 80.4375 23.2637 80.7634 23.8439 81.3436C24.4241 81.9238 24.75 82.7107 24.75 83.5312Z";
  const bottomPath = "M50 81.4255L125 61V198H50V81.4255Z";

  // set columns, rows and scaling depending on device
  const rows = isDesktop ? 5 : 10;
  const columns = isDesktop ? 20 : 10;
  const scale = isLargeScreen ? 0.38 : 0.325;
  const iconWidthScaled = 65 * scale;
  const iconHeightScaled = 200 * scale;

  // calculate icon spacing.
  const calculateSpacing = useCallback(() => {
    const subtractPixel = isLargeScreen ? 0 : !isLargerMobile ? -100 : 120;
    if (!containerWidth || !containerHeight)
      return { spacingX: 0, spacingY: 0 };

    const spacingX = (containerWidth - subtractPixel) / (columns - 1);
    const spacingY = (containerHeight - iconHeightScaled) / (rows - 1);
    return { spacingX, spacingY };
  }, [
    columns,
    containerHeight,
    containerWidth,
    iconHeightScaled,
    isLargeScreen,
    isLargerMobile,
    rows,
  ]);

  // draw chart depending on used device.
  const drawChart = useCallback(
    (spacingX: number, spacingY: number) => {
      const svg = select(svgRef.current);
      svg.selectAll("*").remove();
      svg.attr("width", containerWidth).attr("height", containerHeight);

      svg
        .selectAll("g")
        .data(range(100))
        .join("g")
        .each(function (_d, i) {
          const g = select(this);

          // calculate y coordinate
          const row = Math.floor(i / columns);
          const y_grid = row * spacingY;
          const y_final = y_grid;

          // calculate x coordinate
          // distinguish between desktop, small height and mobile
          const col = i % columns;
          const mobileSpacingX = containerWidth / (columns - 1);
          const x_final_desktop = col * (iconWidthScaled + spacingX);
          const x_final_SmallHeight = col * mobileSpacingX - iconWidthScaled;
          const x_final_mobile = col * mobileSpacingX;

          if (isDesktop) {
            // draw person with lectern
            g.append("path")
              .attr("d", topPath)
              .attr("fill", "#282D43")
              .attr(
                "transform",
                `translate(${
                  isSmallHeight ? x_final_SmallHeight : x_final_desktop
                }, ${y_final}) scale(${scale})`
              )
              .transition()
              .delay(i * 40)
              .duration(300)
              .ease(easeCubicOut)
              .attr("fill", i < femalePercentage ? "white" : "#282D43");

            g.append("path")
              .attr("d", bottomPath)
              .attr("fill", "#282D43")
              .attr(
                "transform",
                `translate(${
                  isSmallHeight ? x_final_SmallHeight : x_final_desktop
                }, ${y_final + 1}) scale(${scale})`
              )
              .transition()
              .delay(i * 40)
              .duration(300)
              .ease(easeCubicOut)
              .attr("fill", i < femalePercentage ? "#8BA8CF" : "#282D43");
          } else {
            //draw circle
            g.append("circle")
              .attr("cy", 48)
              .attr("r", 48)
              .attr("fill", "#282D43")
              .attr(
                "transform",
                `translate(${x_final_mobile}, ${y_final}) scale(${scale})`
              )
              .transition()
              .delay(i * 40)
              .duration(300)
              .ease(easeCubicOut)
              .attr("fill", i < femalePercentage ? "white" : "#282D43");
          }
        });
    },
    [
      columns,
      containerHeight,
      containerWidth,
      femalePercentage,
      iconWidthScaled,
      isDesktop,
      isSmallHeight,
      scale,
    ]
  );

  /**
   * Add resize event handler for responsiveness.
   */
  useEffect(() => {
    const onResize = () => {
      if (boxRef.current) {
        const newHeight =
          isDesktop && !isSmallHeight
            ? boxRef.current.clientHeight
            : boxRef.current.clientHeight * 0.9;
        const newWidth =
          !isLargerMobile && isSmallHeight
            ? boxRef.current.clientWidth * 1.68
            : boxRef.current.clientWidth;

        setContainerHeight(newHeight);
        setContainerWidth(newWidth);

        const { spacingX, spacingY } = calculateSpacing();
        drawChart(spacingX, spacingY);
      }
    };

    onResize();
    window.addEventListener("resize", onResize);
  }, [isDesktop, calculateSpacing, drawChart, isSmallHeight, isLargerMobile]);

  return (
    <Box sx={wrapperStyle}>
      <Box sx={innerWrapperStyle} ref={boxRef}>
        <Box sx={contentBoxStyle}>
          <Box sx={topSectionStyle}>
            <Typography
              sx={{
                ...mainTitleStyle,
                "@media (max-width: 650px)": {
                  marginBottom: "0",
                  fontSize: "2.5rem",
                },
              }}
            >
              {isTablet
                ? `${femalePercentage} von 100 Reden`
                : `${femalePercentage} von 100`}
            </Typography>
            {!isTablet && (
              <Typography sx={{ ...mainTitleStyle, marginBottom: "4rem" }}>
                Reden
              </Typography>
            )}

            <Typography sx={subtitleStyle}>
              {controlMode !== ControlMode.SpeechesCount
                ? `mit ${selectedOption}.000 Zeichen wurden von 1949 bis 2023 im Durchschnitt von Frauen durchgeführt.`
                : `wurden von ${selectedOption} bis ${speeches_count[index]?.end_year} im Durchschnitt von Frauen durchgeführt.`}
            </Typography>

            <Box sx={switchRowStyle}>
              <Typography variant="body1">Anzahl der Reden</Typography>
              <Switch
                checked={controlMode === ControlMode.SpeechesLength}
                sx={{
                  ".Mui-checked.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#F4F7FA",
                    opacity: 0.9,
                  },
                }}
                onChange={() => {
                  const isCount = controlMode === ControlMode.SpeechesCount;
                  setControlMode(
                    isCount
                      ? ControlMode.SpeechesLength
                      : ControlMode.SpeechesCount
                  );

                  setSelectedOption(
                    isCount
                      ? speeches_length[0]?.text_length
                      : speeches_count[0]?.start_year
                  );
                  setFemalePercentage(
                    isCount
                      ? Math.round(
                          speeches_length[0]?.percentage_woman_speeches ?? 0
                        )
                      : Math.round(
                          speeches_count[0]?.percentage_woman_speeches ?? 0
                        )
                  );
                  setIndex(0);
                }}
              />
              <Typography variant="body1">Länge der Reden</Typography>
            </Box>

            {(!isDesktop || isSmallHeight) && (
              <Box sx={wheelPickerContainerStyle}>
                <Typography variant="body1">
                  {controlMode === ControlMode.SpeechesCount
                    ? "Parlament"
                    : !isLargerMobile
                    ? "Tausend Zeichen"
                    : "Zeichen"}
                </Typography>
                <WheelPicker
                  isSpeechesLength={
                    controlMode === ControlMode.SpeechesLength && isLargerMobile
                  }
                  items={
                    controlMode === ControlMode.SpeechesCount
                      ? countOptions
                      : lengthOptions
                  }
                  index={index}
                  onChange={(willIncrease: boolean) => {
                    const isCount = controlMode === ControlMode.SpeechesCount;
                    const currentArray = !isCount
                      ? speeches_length
                      : speeches_count;
                    const newIndexRaw = willIncrease ? index + 1 : index - 1;
                    const newIndex =
                      newIndexRaw > currentArray.length - 1
                        ? 0
                        : newIndexRaw < 0
                        ? currentArray.length - 1
                        : newIndexRaw;

                    // set new selected option to categorize
                    setSelectedOption(
                      !isCount
                        ? speeches_length[newIndex]?.text_length
                        : speeches_count[newIndex]?.start_year
                    );
                    setFemalePercentage(
                      !isCount
                        ? Math.round(
                            speeches_length[newIndex]?.percentage_woman_speeches
                          )
                        : Math.round(
                            speeches_count[newIndex]?.percentage_woman_speeches
                          )
                    );
                  }}
                  setIndex={setIndex}
                  width={window.innerWidth * (!isTablet ? 0.5 : 0.35)}
                />
              </Box>
            )}
          </Box>

          <Box sx={svgContainerStyle(isDesktop && !isSmallHeight)}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${containerWidth} ${containerHeight}`}
              preserveAspectRatio={
                isDesktop && !isSmallHeight ? "xMinYMin" : "xMidyMid"
              }
              style={svgStyle}
            />
          </Box>
        </Box>

        <SpeechControl
          setFemalePercentage={setFemalePercentage}
          controlMode={controlMode}
          lineY1={containerHeight}
          lineY2={containerHeight / 8}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setIndex={setIndex}
        />
      </Box>
    </Box>
  );
};

export default SpeechesDiagram;
