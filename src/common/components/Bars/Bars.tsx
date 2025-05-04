import { useEffect, useRef } from "react";
import { range, select } from "d3";

const Bars = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  /**
   * Create bars as background.
   */
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight * 5;
    const barWidth = width / 7;

    svg.attr("width", width).attr("height", height);

    // define different opacities the bars
    const opacities = [0.05, 0.21, 0.37, 0.53, 0.69, 0.85, 1];

    svg
      .selectAll("rect")
      .data(range(7))
      .join("rect")
      .attr("x", (d) => width - (d + 1) * barWidth)
      .attr("width", barWidth)
      // shift the beginning of the bars
      .attr("y", (d) => d * (width / 12.5))
      .attr("height", (d) => height - d * (width / 12.5))
      .attr("fill", "#282D43")
      .attr("opacity", (d) => opacities[d]);
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
      }}
    />
  );
};

export default Bars;
