import {
  select,
  range,
  scaleLinear,
  area,
  curveCatmullRom,
  line,
  axisBottom,
  format,
  drag,
  pointer,
} from "d3";
import { useRef, useEffect, useState } from "react";
import useIsDesktop from "../../hooks/useIsDesktop";
import { TopicYearlyData } from "../../constants";

interface TimelineProps {
  data: TopicYearlyData;
  onYearRangeChange: (start: number, end: number) => void;
  initialStartYear: number;
  initialEndYear: number;
}

/**
 * Timeline to pick a year range for topic exploration diagram.
 */
const TimeLine = ({
  data,
  onYearRangeChange,
  initialStartYear,
  initialEndYear,
}: TimelineProps) => {
  const [yearRange, setYearRange] = useState<[number, number]>([
    initialStartYear,
    initialEndYear,
  ]);

  const isDesktop = useIsDesktop(950);
  const isTablet = useIsDesktop(650);
  const isMobile = useIsDesktop(450);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = isDesktop ? 800 : isTablet ? 550 : isMobile ? 400 : 340;
  const height = 180;
  const margin = { top: 0, right: 12, bottom: 60, left: 12 };

  /**
   * If data changes: Update timeline.
   */
  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const years = Object.keys(data).map(Number).sort();

    // create seperate female and male data
    // for easier visualization
    const femaleData = years.map((year) => ({
      year,
      value: data[year]?.female_percentage ?? 0,
    }));

    const maleData = years.map((year) => ({
      year,
      value: data[year]?.male_percentage ?? 0,
    }));

    const x = scaleLinear()
      .domain([1949, 2023])
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain([0, 104]) // 100 % + added space to the top
      .range([height - margin.bottom, margin.top]);

    const g = svg.append("g");

    g.append("rect")
      .attr("fill", "transparent")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height);

    // create grid
    const gridYears = range(1950, 2024, 2.5);
    gridYears.forEach((year) => {
      g.append("line")
        .attr("x1", x(year))
        .attr("x2", x(year))
        .attr("y1", margin.top)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "white")
        .attr("stroke-dasharray", "4 4")
        .attr("opacity", year % 10 === 0 ? 0.6 : 0.2);
    });

    // create clip path
    // so that no line or area will be shown outside this area
    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "path-clip")
      .append("rect")
      .attr("x", margin.left)
      .attr("y", margin.top)
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom);

    // create female and male lines, paths and areas
    // for visualization
    const maleArea = area<{ year: number; value: number }>()
      .x((d) => x(d.year))
      .y0(y(0))
      .y1((d) => y(d.value))
      .curve(curveCatmullRom.alpha(0.5));

    const maleLine = line<{ year: number; value: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.value))
      .curve(curveCatmullRom.alpha(0.5));

    g.append("path")
      .datum(maleData)
      .attr("fill", "#C3896C")
      .attr("opacity", 0.8)
      .attr("d", maleArea)
      .attr("clip-path", `url(#path-clip)`);

    g.append("path")
      .datum(maleData)
      .attr("fill", "none")
      .attr("stroke", "#D6B29B")
      .attr("stroke-width", 0.6)
      .attr("opacity", 0.7)
      .attr("d", maleLine)
      .attr("clip-path", `url(#path-clip)`);

    const femaleLine = line<{ year: number; value: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.value))
      .curve(curveCatmullRom.alpha(0.5));

    const femaleArea = area<{ year: number; value: number }>()
      .x((d) => x(d.year))
      .y0(y(0))
      .y1((d) => y(d.value))
      .curve(curveCatmullRom.alpha(0.5));

    g.append("path")
      .datum(femaleData)
      .attr("fill", "#D6B29B")
      .attr("opacity", 0.6)
      .attr("d", femaleArea)
      .attr("clip-path", `url(#path-clip)`);

    g.append("path")
      .datum(femaleData)
      .attr("fill", "none")
      .attr("stroke", "#D6B29B")
      .attr("stroke-width", 0.6)
      .attr("opacity", 1)
      .attr("d", femaleLine)
      .attr("clip-path", `url(#path-clip)`);

    // create xAxis
    const xAxis = axisBottom(x).tickFormat(format("d")).tickSize(0);

    g.append("g")
      .attr("transform", `translate(0, ${height + 10 - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("font-size", ".75rem")
      .attr("font-family", "Inter, sans-serif")
      .attr("font-weight", "600")
      .attr("fill", "white");

    // remove standard xAxis bottom line
    g.selectAll(".domain").remove();

    // create brush
    // to show what range is selected
    const brushGroup = g
      .append("g")
      .attr("class", "brush")
      .attr("fill", "white")
      .attr("opacity", 0.15)
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .selectAll("rect")
      .data([yearRange])
      .join("rect")
      .attr("x", x(yearRange[0]))
      .attr("y", margin.top)
      .attr("width", x(yearRange[1]) - x(yearRange[0]))
      .attr("height", height - 28);

    // create triangles underneath brush
    // to edit selected range
    const triangleSize = isTablet ? 9 : 14;

    const leftTriangle = g
      .append("path")
      .attr("fill", "white")
      .attr("opacity", 0.9);

    const rightTriangle = g
      .append("path")
      .attr("fill", "white")
      .attr("opacity", 0.9);

    // update/ draw triangle position after updating the range
    function updateTriangles(startX: number, endX: number) {
      const yOffset = isDesktop ? 16 : 12;
      const yPosition = height - yOffset + triangleSize;

      leftTriangle.attr(
        "d",
        line()([
          //x1, y1
          [startX - triangleSize, yPosition],
          //x2, y2
          [startX + triangleSize, yPosition],
          //x3, y3
          [startX, height - 20],
          //x1, y1
          [startX - triangleSize, yPosition],
        ])
      );

      rightTriangle.attr(
        "d",
        line()([
          //x1, y1
          [endX - triangleSize, yPosition],
          //x2, y2
          [endX + triangleSize, yPosition],
          //x3, y3
          [endX, height - 20],
          //x1, y1
          [endX - triangleSize, yPosition],
        ])
      );
    }

    // left triangle
    const dragLeft = drag<SVGPathElement, unknown>()
      .on("drag", (event) => {
        // distinguish between mobile and desktop
        // because of compatibility problems
        const [mouseX] = isDesktop ? pointer(event, svg.node()) : [event.x];

        setYearRange(([, prevEnd]) => {
          const endX = x(prevEnd);

          // calculate new start position
          // be aware of its boundaries
          // boundary left: start year with 10px offset
          // boundary right: right side of the timeline
          const newXPosition = Math.min(
            Math.max(mouseX, margin.left),
            endX - 10
          );
          // get the year depending on the new position
          const newStart = Math.round(x.invert(newXPosition));

          // update triangle position
          updateTriangles(x(newStart), x(prevEnd));

          // update visual brush
          brushGroup
            .attr("x", x(newStart))
            .attr("width", x(prevEnd) - x(newStart));

          // update year range immediately
          onYearRangeChange(newStart, prevEnd);

          return [newStart, prevEnd];
        });
      })
      .on("end", () => {
        setYearRange((curr) => {
          onYearRangeChange(curr[0], curr[1]);
          return curr;
        });
      });

    // right triangle
    const dragRight = drag<SVGPathElement, unknown>()
      .on("drag", (event) => {
        // distinguish between mobile and desktop
        // because of compatibility problems
        const [mouseX] = isDesktop ? pointer(event, svg.node()) : [event.x];

        setYearRange(([prevStart]) => {
          const startX = x(prevStart);
          // calculate new start position
          // be aware of its boundaries
          // boundary left: start year with 10px offset
          // boundary right: right side of the timeline
          const newXPosition = Math.max(
            Math.min(mouseX, width - margin.right),
            startX + 10
          );
          // get the year depending on the new position
          const newEnd = Math.round(x.invert(newXPosition));

          // update triangle position
          updateTriangles(x(prevStart), x(newEnd));

          // update visual brush
          brushGroup
            .attr("x", x(prevStart))
            .attr("width", x(newEnd) - x(prevStart));

          // update year range immediately
          onYearRangeChange(prevStart, newEnd);

          return [prevStart, newEnd];
        });
      })
      .on("end", () => {
        setYearRange((curr) => {
          onYearRangeChange(curr[0], curr[1]);
          return curr;
        });
      });

    leftTriangle.call(dragLeft).style("cursor", "ew-resize");
    rightTriangle.call(dragRight).style("cursor", "ew-resize");

    updateTriangles(x(yearRange[0]), x(yearRange[1]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height={height}
      preserveAspectRatio="xMidYMid meet"
      viewBox={`0 0 ${width} ${height}`}
    />
  );
};

export default TimeLine;
