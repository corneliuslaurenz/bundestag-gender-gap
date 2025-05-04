import { select, arc as d3arc, DefaultArcObject } from "d3";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Distribution, Party } from "../../constants";
import { getColorForParty } from "../../utils";

export type MultiArcDiagramProps = {
  distribution: Distribution;
};

/**
 * Component to generate and display arc diagram with multiple parts.
 */
const MultiArcDiagram = ({ distribution }: MultiArcDiagramProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const prevDistributionRef = useRef<Distribution>(distribution);
  const height = 389;

  /**
   * Draw and animate arc.
   */
  useEffect(() => {
    const svg = select(svgRef.current);

    const width = 725;
    const centerX = width / 2;
    const centerY = height;
    const radius = width / 2;
    const arcAngle = 210;

    // calculate arc variables
    const fullArc = (arcAngle * Math.PI) / 180;
    const padPercentage = 0.5;
    const padAngle = fullArc * (padPercentage / 100);
    const totalPad = padAngle * Object.keys(distribution).length;
    const effectiveArc = fullArc - totalPad;
    const startAngle = ((-arcAngle / 2) * Math.PI) / 180;

    // calculate total number of seats
    const totalSeats = Object.values(distribution).reduce(
      (sum, val) => sum + (val || 0),
      0
    );

    // create object per part
    // write it into array
    const partsWithPercentage = Object.entries(distribution).map(
      ([party, seats]) => {
        const percentage = ((seats ?? -1) / totalSeats) * 100;
        return { party, percentage, color: getColorForParty(party as Party) };
      }
    );

    const animated = { t: 0 };

    // animate arc
    gsap.to(animated, {
      t: 1,
      duration: 0.5,
      ease: "power1.inOut",
      onUpdate: () => {
        svg.selectAll(".arc-part").remove();

        // calculate current parts
        const currentParts = partsWithPercentage.map((part) => {
          const prevPercentage = (prevDistributionRef.current[
            part.party as Party
          ] || part.percentage) as number;
          const percentage =
            prevPercentage + (part.percentage - prevPercentage) * animated.t;
          return { ...part, percentage: percentage };
        });

        const totalpercentage = currentParts.reduce(
          (sum, s) => sum + s.percentage,
          0
        );

        // norm to make sure the numbers are the same
        // provide eg rounding errors
        const normParts = currentParts.map((part) => ({
          ...part,
          percentage: (part.percentage / totalpercentage) * 100,
        }));

        // draw every part as arc
        // so that you have a multi arc
        normParts.reduce((currentStart, part) => {
          const partAngle = (part.percentage / 100) * effectiveArc;

          // draw a single part as arc
          const arc = d3arc()
            .innerRadius(100)
            .outerRadius(radius)
            .startAngle(currentStart)
            .endAngle(currentStart + partAngle)
            .cornerRadius(10)
            .padAngle(padAngle);

          svg
            .append("path")
            .attr("class", "arc-part")
            .attr("transform", `translate(${centerX}, ${centerY})`)
            .attr("fill", part.color)
            .attr("opacity", 0.85)
            .attr("d", arc({} as DefaultArcObject));

          return currentStart + partAngle + padAngle;
        }, startAngle);
      },
      // set distribution to prev distribution
      onComplete: () => {
        prevDistributionRef.current = distribution;
      },
    });

    // add center circle to the center in background color
    // to simulate a hole
    svg
      .selectAll(".center-circle")
      .data([null])
      .join("circle")
      .attr("class", "center-circle")
      .attr("cx", centerX)
      .attr("cy", () => {
        const middleAngle = startAngle + fullArc / 2;
        const circleOffsetY = radius * Math.sin(-middleAngle);
        return centerY - circleOffsetY + 2;
      })
      .attr("r", 100)
      .attr("fill", "#4F3F50");
  }, [distribution, height]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
      height="100%"
      // set height to heigt plus offset
      viewBox={`0 0 725 ${height + 132}`}
      preserveAspectRatio="xMidYMax meet"
    />
  );
};

export default MultiArcDiagram;
