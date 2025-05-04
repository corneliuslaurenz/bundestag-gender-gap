import { useEffect, useRef } from "react";
import { select, range } from "d3";
import useIsDesktop from "../../hooks/useIsDesktop";

/**
 * Component for small bars background.
 */
const SmallBars = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isDesktop = useIsDesktop(950);
  const isTablet = useIsDesktop(650);

  /**
   * Draw bars for women and men with fade in.
   */
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight * 2.5;
    const barWidth = width / 14;

    // define a fade height to fade in color on top
    // used for the filter of the interactive diagram
    const fadeHeight = isDesktop ? 100 : isTablet ? 60 : 40;

    svg.attr("width", width).attr("height", height);

    // prevent double create of def
    const existingDefs = svg.select<SVGDefsElement>("defs");
    const defs = existingDefs.empty() ? svg.append("defs") : existingDefs;

    // create 14 gradient bars (color faded in) for 7 topics
    // 7 for women, 7 for men
    const barData = range(14);
    barData.forEach((_d, i) => {
      const barId = `bar-${i}`;

      // check if bar with barId exists already
      // if yes abort
      if (!defs.select(`#${barId}`).empty()) {
        return;
      }

      // create bars as gradient with women or men color
      const color = i % 2 ? "#708DC1" : "#5265A3";
      const gradient = defs
        .append("linearGradient")
        .attr("id", barId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", fadeHeight);

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", color)
        .attr("stop-opacity", 0);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", color)
        .attr("stop-opacity", 1);
    });

    // draw bars
    svg
      .selectAll(".bar")
      .data(barData)
      .join(
        // append new bars
        (selection) => {
          return selection
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => width - (d + 1) * barWidth)
            .attr("y", 0)
            .attr("width", barWidth)
            .attr("height", height)
            .attr("fill", (_d, i) => `url(#bar-${i})`);
        },
        // update existing bars
        (update) => {
          return update
            .attr("x", (d) => width - (d + 1) * barWidth)
            .attr("fill", (_d, i) => `url(#bar-${i})`);
        },
        (exit) => {
          return exit.remove();
        }
      );
  }, [isDesktop, isTablet]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100vw",
        height: "100%",
      }}
    />
  );
};

export default SmallBars;
