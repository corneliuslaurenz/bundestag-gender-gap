import { useEffect, useRef } from "react";
import { select, arc, DefaultArcObject } from "d3";
import gsap from "gsap";

type ArcDiagramProps = {
  womanPercentage?: number;
};

/**
 * Component to generate and display full arc diagram.
 */
export const ArcDiagram = ({ womanPercentage = 80 }: ArcDiagramProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const previousPercentageRef = useRef(womanPercentage);
  const height = 389;

  /**
   * Draw and animate arc.
   */
  useEffect(() => {
    const svg = select(svgRef.current);

    const darkColor = "#C2ADC5";
    const lightColor = "#D9CCDB";

    const width = 725;
    const centerX = width / 2;
    const centerY = height;
    const radius = width / 2;
    const arcAngle = 210;

    // calculate arc variables
    const fullArc = (arcAngle * Math.PI) / 180;
    const padAngle = fullArc * (1 / 100);
    const effectiveArc = fullArc - padAngle;
    const startAngle = ((-arcAngle / 2) * Math.PI) / 180;

    // create arc path with d3 and return
    const createArcPaths = (percentage: number) => {
      const darkArcLength = effectiveArc * (percentage / 100);
      const lightArcLength = effectiveArc - darkArcLength;

      const arcDark = arc()
        .innerRadius(100)
        .outerRadius(radius)
        .startAngle(startAngle)
        .endAngle(startAngle + darkArcLength)
        .cornerRadius(10)
        .padAngle(padAngle);

      const arcLight = arc()
        .innerRadius(100)
        .outerRadius(radius)
        .startAngle(startAngle + darkArcLength)
        .endAngle(startAngle + darkArcLength + lightArcLength)
        .cornerRadius(10)
        .padAngle(padAngle);

      return {
        darkPath: arcDark({} as DefaultArcObject) || "",
        lightPath: arcLight({} as DefaultArcObject) || "",
      };
    };

    // use arc path to create d3 fills
    const darkArcSelection = svg
      .selectAll(".arc-dark")
      .data([null])
      .join("path")
      .attr("class", "arc-dark")
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr("fill", lightColor)
      .attr("d", createArcPaths(previousPercentageRef.current).darkPath);

    const lightArcSelection = svg
      .selectAll(".arc-light")
      .data([null])
      .join("path")
      .attr("class", "arc-light")
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .attr("fill", darkColor)
      .attr("d", createArcPaths(previousPercentageRef.current).lightPath);

    // if percentage changes -> morph animate withs gsap
    if (previousPercentageRef.current !== womanPercentage) {
      const tweenObj = { pct: previousPercentageRef.current };
      gsap.to(tweenObj, {
        pct: womanPercentage,
        duration: 0.375,
        ease: "power1.inOut",
        onUpdate: () => {
          // create new path on update
          const { darkPath, lightPath } = createArcPaths(tweenObj.pct);
          darkArcSelection.attr("d", darkPath);
          lightArcSelection.attr("d", lightPath);
        },
        onComplete: () => {
          const { darkPath, lightPath } = createArcPaths(womanPercentage);
          darkArcSelection.attr("d", darkPath);
          lightArcSelection.attr("d", lightPath);
          previousPercentageRef.current = womanPercentage;
        },
      });
    }

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
  }, [height, womanPercentage]);

  return (
    <svg
      ref={svgRef}
      style={{
        width: "100%",
        height: "auto",
        display: "block",
      }}
      // set height to heigt plus offset
      viewBox={`0 0 725 ${height + 132}`}
      preserveAspectRatio="xMidYMid"
    />
  );
};
