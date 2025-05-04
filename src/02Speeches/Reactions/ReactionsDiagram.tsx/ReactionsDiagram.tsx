import { Box, Typography, Switch } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { select } from "d3";
import useIsDesktop from "../../../common/hooks/useIsDesktop";
import SmallBars from "../../../common/components/Bars/SmallBars";
import {
  centeredTitleStyle,
  chartWrapperStyle,
  getLegendBarStyle,
  getSwitchBoxStyle,
  innerBoxStyle,
  legendBarContainerStyle,
  legendStyle,
  legendTextStyle,
  legendWrapperStyle,
  wrapperStyle,
  smallBarsStyle,
  svgStyle,
  switchBarRowStyle,
  switchLabelStyle,
  titleContainerStyle,
  legendTextBoxStyle,
} from "./ReactionsDiagram.styles";
import { changeToGermanComma } from "../../../common/utils";
import { barArray } from "../../../common/constants";

/**
 * Component for interacive speeches reaction diagram.
 */
const Reactionsdiagram = () => {
  // opacity bools for every reaction
  const [showLaughter, setShowLaughter] = useState(true);
  const [showDisgust, setShowDisgust] = useState(true);
  const [showApproval, setShowApproval] = useState(true);
  const [showCheerfulness, setShowCheerfulness] = useState(true);
  const [showApplause, setShowApplause] = useState(true);
  const [showDisquiet, setShowDisquiet] = useState(true);
  const [showDisturbance, setShowDisturbance] = useState(true);

  const isTablet = useIsDesktop(650);
  const isLargeScreen = useIsDesktop(1400);

  const width = window.innerWidth;
  const barWidth = width / 14;
  const height = isLargeScreen ? 400 : isTablet ? 300 : 200;

  const svgRef = useRef<SVGSVGElement | null>(null);

  // show bar only if reaction state is true
  // get its opacity
  const getBarOpacity = useCallback(
    (d: {
      type: string;
      title: string;
      indicator_women: number;
      indicator_men: number;
    }): number => {
      switch (d.title) {
        case "Einspruch":
          return showDisturbance ? 1 : 0;
        case "Gelächter":
          return showLaughter ? 1 : 0;
        case "Unruhe":
          return showDisquiet ? 1 : 0;
        case "Abscheu":
          return showDisgust ? 1 : 0;
        case "Zustimmung":
          return showApproval ? 1 : 0;
        case "Heiterkeit":
          return showCheerfulness ? 1 : 0;
        case "Applaus":
          return showApplause ? 1 : 0;
        default:
          return 1;
      }
    },
    [
      showApplause,
      showApproval,
      showCheerfulness,
      showDisgust,
      showDisquiet,
      showDisturbance,
      showLaughter,
    ]
  );

  /**
   * Animate bars diagram.
   */
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);

    // define maxIndicator (applause) to set the scale
    const maxIndicator = 3.65;
    const scale = height / maxIndicator;
    // add height for additional bars underneath diagram bars
    const extraHeight = 400;

    svg.attr("width", width).attr("height", height + extraHeight);

    const genderedArray = barArray.flatMap((d) => [
      { ...d, type: "women" },
      { ...d, type: "men" },
    ]);

    const barGroups = svg
      .selectAll("g.bar-group")
      .data(genderedArray)
      .join("g")
      .attr("class", "bar-group")
      .attr("transform", (_d, i) => `translate(${i * barWidth}, 0)`);

    // draw diagram
    barGroups
      .selectAll("rect")
      .data((d) => [d])
      .join(
        (enter) => {
          return enter
            .append("rect")
            .attr("width", barWidth)
            .attr("y", (d) =>
              d.type === "women"
                ? height - d.indicator_women * scale
                : height - d.indicator_men * scale
            )
            .attr("height", (d) =>
              d.type === "women"
                ? d.indicator_women * scale
                : d.indicator_men * scale
            )
            .attr("fill", (d) => (d.type === "women" ? "#708DC1" : "#5265A3"))
            .style("opacity", (d) => getBarOpacity(d));
        },
        (update) => {
          return update
            .attr("y", (d) =>
              d.type === "women"
                ? height - d.indicator_women * scale
                : height - d.indicator_men * scale
            )
            .attr("height", (d) =>
              d.type === "women"
                ? d.indicator_women * scale
                : d.indicator_men * scale
            )
            .style("opacity", (d) => getBarOpacity(d));
        }
      );

    // draw extra bars
    // to give the possibility to hide specific bars
    // without loosing the bars in the background
    barGroups
      .selectAll("rect.extra-bar")
      .data((d) => [d])
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("class", "extra-bar")
            .attr("width", barWidth)
            .attr("y", height - 10)
            .attr("height", extraHeight)
            .attr("fill", (d) => (d.type === "women" ? "#708DC1" : "#5265A3"))
            .style("opacity", (d) => getBarOpacity(d)),
        (update) =>
          update
            .attr("y", height)
            .attr("height", extraHeight)
            .style("opacity", 1)
      );

    // add text to show indicator number
    barGroups
      .selectAll("text")
      .data((d) => [d])
      .join("text")
      .text((d) =>
        d.type === "women"
          ? changeToGermanComma(d.indicator_women.toString())
          : changeToGermanComma(d.indicator_men.toString())
      )
      .attr("x", barWidth / 2)
      .attr("y", (d) =>
        d.type === "women"
          ? height - d.indicator_women * scale + height / 8
          : height - d.indicator_men * scale + height / 8
      )
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("font-size", isTablet ? ".75rem" : ".5rem")
      .attr("font-family", '"Inter", sans-serif')
      .attr("font-weight", 600)
      .style("pointer-events", "none")
      .style("opacity", (d) => getBarOpacity(d));
  }, [width, height, isTablet, barWidth, getBarOpacity]);

  return (
    <Box sx={wrapperStyle}>
      <Box sx={innerBoxStyle}>
        <Box sx={titleContainerStyle}>
          <Box sx={centeredTitleStyle}>
            <Typography variant="h2">
              Anzahl der Reaktionen pro Rede von 1949 bis 2023
            </Typography>
          </Box>
        </Box>

        <Box sx={switchBarRowStyle}>
          {barArray.map((val, i) => {
            const boolMap: {
              [key: string]: [
                boolean,
                React.Dispatch<React.SetStateAction<boolean>>
              ];
            } = {
              Einspruch: [showDisturbance, setShowDisturbance],
              Gelächter: [showLaughter, setShowLaughter],
              Unruhe: [showDisquiet, setShowDisquiet],
              Abscheu: [showDisgust, setShowDisgust],
              Zustimmung: [showApproval, setShowApproval],
              Heiterkeit: [showCheerfulness, setShowCheerfulness],
              Applaus: [showApplause, setShowApplause],
            };

            const [bool, setBool] = boolMap[val.title] ?? [true, () => {}];

            return (
              <Box key={i} sx={getSwitchBoxStyle(barWidth)}>
                <Typography variant="body1" sx={switchLabelStyle}>
                  {val.title}
                </Typography>
                <Switch
                  checked={bool}
                  onChange={() => setBool((prev) => !prev)}
                  sx={{ marginTop: "0.5rem" }}
                />
              </Box>
            );
          })}
        </Box>

        <Box sx={legendWrapperStyle}>
          <Box sx={legendStyle}>
            <Box sx={legendTextBoxStyle}>
              <Typography sx={legendTextStyle}>Reden von Frauen</Typography>
              <Typography sx={legendTextStyle}>Reden von Männern</Typography>
            </Box>
            <Box sx={legendBarContainerStyle}>
              <Box sx={getLegendBarStyle("#708DC1")} />
              <Box sx={getLegendBarStyle("#5265A3")} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={chartWrapperStyle}>
        <svg ref={svgRef} style={svgStyle} />
        <Box sx={smallBarsStyle}>
          <SmallBars />
        </Box>
      </Box>
    </Box>
  );
};

export default Reactionsdiagram;
