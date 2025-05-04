import { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  select,
  scaleLinear,
  axisBottom,
  curveNatural,
  range,
  format,
  area,
  line as d3line,
} from "d3";
import parliament_members from "../../common/data/parliament_members_seats.json";
import useIsDesktop from "../../common/hooks/useIsDesktop";
import { containerStyles, wrapperStyles } from "./WomanCountDiagram.styles";
import useIsLargeHeight from "../../common/hooks/useIsLargeHeight";

gsap.registerPlugin(ScrollTrigger);

interface ElectionPeriod {
  start_year: number;
  number_of_women: number;
  percentage_of_women: number;
}

/**
 * Component for diagram that shows woman in parliament over the years.
 * Scroll controlled.
 */
const WomanCountDiagram = () => {
  // refs
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const isDesktop = useIsDesktop(950);

  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const isSmallDesktopHeight = !useIsLargeHeight(800) && isDesktop;
  const data: ElectionPeriod[] = parliament_members.election_periods;

  /**
   * Add resize event handler for responsiveness.
   */
  useEffect(() => {
    if (!containerRef.current) return;

    const onResize = () => {
      const newContainerWidth = containerRef.current?.clientWidth || 800;
      const newContainerHeight = Math.min(720, newContainerWidth * 0.6);

      setContainerWidth(newContainerWidth);
      setContainerHeight(newContainerHeight);

      ScrollTrigger.refresh();
    };

    onResize();
    ScrollTrigger.refresh();

    window.addEventListener("resize", onResize);
  }, [isDesktop]);

  /**
   * If container width or height changes: Draw and animate diagram.
   */
  useEffect(() => {
    if (!svgRef.current || !containerWidth || !containerHeight) return;

    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current)
      .attr(
        "viewBox",
        `0 0 ${containerWidth + (isDesktop ? 68 : 80)} ${containerHeight + 40}`
      )
      .append("g")
      .attr("transform", isDesktop ? "translate(34, 0)" : "translate(40, 0)")
      .attr("preserveAspectRatio", "xMidYMid");

    // substitute data for 1949 an 2021
    // since we will only look at the data between 1950 and 2020
    const filteredData = data.map((period) => {
      if (period.start_year === 1949) return { ...period, start_year: 1950 };
      if (period.start_year === 2021) return { ...period, start_year: 2020 };
      return period;
    }) as ElectionPeriod[];

    const xAxis = scaleLinear().domain([1950, 2020]).range([0, containerWidth]);
    const yAxis = scaleLinear().domain([0, 100]).range([containerHeight, 0]);

    // create and append pattern fill
    const pattern = svg
      .append("defs")
      .append("pattern")
      .attr("id", "pattern")
      .attr("width", 14)
      .attr("height", 1)
      .attr("patternTransform", `rotate(${45})`)
      .attr("patternUnits", "userSpaceOnUse");

    pattern
      .append("rect")
      .attr("width", 6)
      .attr("height", 1)
      .style("fill", "#C2ADC5")
      .style("opacity", 0.5);

    const patternFill = svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "url(#pattern)")
      .attr("opacity", 0)
      .attr(
        "d",

        area<ElectionPeriod>()
          .x((d) => xAxis(d.start_year))
          .y0(containerHeight)
          .y1((d) => yAxis(d.percentage_of_women))
          .curve(curveNatural)
      );

    // animate pattern fill
    gsap.to(patternFill.node(), {
      scrollTrigger: {
        id: "woman-count-pattern",
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
        onUpdate: (self) => {
          const progress = self.progress;

          // start without opacity
          // if path animation process almost finished
          // -> show pattern
          if (progress >= 0.99) {
            gsap.to(patternFill.node(), {
              opacity: 1,
              duration: 0.4,
              ease: "power1.inOut",
            });
          } else {
            gsap.to(patternFill.node(), {
              opacity: 0,
              duration: 0.4,
              ease: "power1.inOut",
            });
          }
        },
      },
    });

    // calculate colored background bars
    const yearRanges = range(1950, 2020, 10).map((from, index) => ({
      from,
      to: from + 10,
      opacity: 0.3 + index * 0.075,
    }));

    svg
      .selectAll(".year-rect")
      .data(yearRanges)
      .enter()
      .append("rect")
      .attr("x", (d) => xAxis(d.from))
      .attr("y", 0)
      .attr("width", (d) => xAxis(d.to) - xAxis(d.from))
      .attr("height", containerHeight)
      .attr("fill", "#5E495F")
      .attr("opacity", (d) => d.opacity);

    // create text on xAxis
    const xTicks = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

    svg
      .append("g")
      .attr("transform", `translate(0,${containerHeight + 10})`)
      .call(axisBottom(xAxis).tickValues(xTicks).tickFormat(format("d")))
      .call((g) => {
        g.select(".domain").remove();
        g.selectAll(".tick line").remove();
      })
      .selectAll("text")
      .attr("fill", "#C2ADC5")
      .style("font-size", function () {
        const calculatedSize = isSmallDesktopHeight ? 28 : !isDesktop ? 18 : 26;
        return `${calculatedSize}px`;
      })
      .style("font-family", '"Inter", sans-serif')
      .style("opacity", 1);

    // create diagram line
    const line = d3line<ElectionPeriod>()
      .x((d) => xAxis(d.start_year))
      .y((d) => yAxis(d.percentage_of_women))
      .curve(curveNatural);

    const path = svg
      .append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "#C2ADC5")
      .attr("stroke-width", isDesktop ? 4.4 : 2.4)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", line)
      .attr("transform", "translate(2, 0)");

    const totalPathLength = path.node()?.getTotalLength() ?? 0;

    // set path initially
    path
      .attr("stroke-dasharray", `${totalPathLength} ${totalPathLength}`)
      .attr("stroke-dashoffset", totalPathLength);

    pathRef.current = path.node() as SVGPathElement;

    // animate scroll path
    gsap.to(pathRef.current, {
      opacity: 0.9,
      scrollTrigger: {
        id: "woman-count-path",
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          const drawLength = totalPathLength * Math.min(progress, 0.995);
          pathRef.current?.setAttribute(
            "stroke-dashoffset",
            (totalPathLength - drawLength).toString()
          );
        },
      },
    });

    // animate a single percentage value (fade in/ out).
    const animatePercentageValue = ({
      x,
      y,
      text,
      triggerProgress,
    }: {
      x: number;
      y: number;
      text: string;
      triggerProgress: number;
    }) => {
      const textElement = svg
        .append("g")
        .attr("transform", `translate(${x}, ${y})`)
        .style("opacity", 0);

      textElement
        .append("text")
        .attr("fill", "white")
        .style("font-size", () => {
          const calculatedSize = isSmallDesktopHeight
            ? 44
            : !isDesktop
            ? 28
            : 48;
          return `${calculatedSize}px`;
        })
        .style("font-family", '"Ubuntu", sans-serif')
        .text(text);

      const fadeInAnimation = gsap.to(textElement.node(), {
        opacity: 1,
        duration: 0.4,
        ease: "ease.inOut",
        paused: true,
      });

      const fadeOutAnimation = gsap.to(textElement.node(), {
        opacity: 0,
        duration: 0.2,
        ease: "ease.inOut",
        paused: true,
      });

      ScrollTrigger.create({
        id: "woman-count-wrapper",
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const isCurrentlyVisible = self.progress >= triggerProgress;

          // fade in
          if (isCurrentlyVisible && textElement.node()?.style.opacity === "0") {
            fadeInAnimation.restart();
            // fade out
          } else if (
            !isCurrentlyVisible &&
            textElement.node()?.style.opacity === "1"
          ) {
            fadeOutAnimation.restart();
          }
        },
      });
    };

    animatePercentageValue({
      x: xAxis(1951),
      y: yAxis(15),
      text: "8%",
      triggerProgress: 0.01,
    });

    animatePercentageValue({
      x: xAxis(1971),
      y: yAxis(12),
      text: "6%",
      triggerProgress: 0.25,
    });

    animatePercentageValue({
      x: xAxis(1991),
      y: yAxis(isDesktop ? 32 : 38),
      text: "21%",
      triggerProgress: 0.56,
    });

    animatePercentageValue({
      x: xAxis(2011),
      y: yAxis(isDesktop ? 41 : 44),
      text: "33%",
      triggerProgress: 0.845,
    });
  }, [containerHeight, containerWidth, data, isDesktop, isSmallDesktopHeight]);

  return (
    <>
      <Box sx={wrapperStyles} ref={wrapperRef}>
        <Box sx={containerStyles} ref={containerRef}>
          <Typography variant="h2" mb="2.4rem" width="84vw">
            Anteil von Frauen im Deutschen Bundestag über Jahrzehnte
          </Typography>
          <svg ref={svgRef} width="80%" height="50%" />
        </Box>
      </Box>
    </>
  );
};

export default WomanCountDiagram;
