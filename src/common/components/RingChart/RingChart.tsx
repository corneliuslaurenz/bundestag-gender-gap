import { Box, Typography } from "@mui/material";
import { arc as d3arc, pie as d3pie, select } from "d3";
import { useRef, useEffect } from "react";
import {
  centerContentStyle,
  iconBoxStyle,
  wrapperStyle,
  textContainerStyle,
  textStyle,
} from "./RingChart.styles";

type RingChartProps = {
  womanPercentage: number;
  size?: number;
  iconPath?: string;
  iconColor?: string;
  centerText?: string;
  textColor?: string;
  textSize?: number;
};

/**
 * Component for ring chart diagram.
 */
const RingChart = ({
  womanPercentage,
  iconPath,
  centerText,
}: RingChartProps) => {
  const ref = useRef<SVGSVGElement | null>(null);
  const radius = 146;
  const thickness = 44;

  const arc = d3arc()
    .innerRadius(radius - thickness)
    .outerRadius(radius);

  const pie = d3pie<number>()
    .sort(null)
    .value((d) => d);

  /**
   * Render diagram.
   */
  useEffect(() => {
    const svg = select(ref.current);
    svg.selectAll("*").remove();

    const g = svg
      .append("g")
      .attr("transform", `translate(${radius},${radius})`);

    const initialData = pie([womanPercentage, 100 - womanPercentage]);

    // distinguish between women and men values
    g.selectAll("path")
      .data(initialData)
      .enter()
      .append("path")
      .attr("fill", (_d, i) => (i === 0 ? "#D6B29B" : "#C3896C"))
      .attr("d", arc as unknown as string);
  }, [womanPercentage, centerText, iconPath, pie, arc]);

  return (
    <Box sx={wrapperStyle(radius)}>
      <Box sx={centerContentStyle(!!iconPath)}>
        {iconPath && (
          <Box sx={iconBoxStyle(radius)}>
            <svg fill="white" viewBox="0 0 256 256" width="36px" height="36px">
              <path d={iconPath} />
            </svg>
          </Box>
        )}
        <Box sx={textContainerStyle}>
          <Typography variant="body2" sx={textStyle}>
            {centerText === "Schwangerschaftsabbruch "
              ? "Schwangerschafts-abbruch"
              : centerText === "Studium und Ausbildungsförderung"
              ? "Studium und Ausbildungs-förderung"
              : centerText}
          </Typography>
        </Box>
      </Box>
      <svg
        ref={ref}
        width={`${radius * 2}`}
        height={`${radius * 2}`}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      />
    </Box>
  );
};

export default RingChart;
