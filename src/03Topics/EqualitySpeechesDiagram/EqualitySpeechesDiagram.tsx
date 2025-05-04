import { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { select, scaleBand, scaleLinear, axisBottom, max, axisLeft } from "d3";

import equality_speeches from "../../common/data/equality_speeches.json";
import {
  containerStyles,
  wrapperStyles,
} from "./EqualitySpeechesDiagram.styles";
import useIsDesktop from "../../common/hooks/useIsDesktop";
import useIsLargeHeight from "../../common/hooks/useIsLargeHeight";

gsap.registerPlugin(ScrollTrigger);

interface SpeechData {
  year: number;
  speeches_count: number;
}

/**
 * Component for static diagram of equality speeches over the decades.
 */
const EqualitySpeechesDiagram = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const isDesktop = useIsDesktop(950);
  const isSmallDesktopHeight = !useIsLargeHeight(800) && isDesktop;

  const data = equality_speeches as SpeechData[];

  /**
   * Add resize event handler for responsiveness.
   */
  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const onResize = () => {
      const newContainerWidth = containerRef.current?.clientWidth || 800;
      const newContainerHeight = newContainerWidth * 0.5;

      setContainerWidth(newContainerWidth);
      setContainerHeight(newContainerHeight);

      ScrollTrigger.refresh();
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, []);

  /**
   * Animate diagram.
   */
  useEffect(() => {
    if (!svgRef.current || !containerWidth || !containerHeight) return;

    const margin = {
      top: 40,
      right: 50,
      bottom: 40,
      left: isDesktop ? 100 : 75,
    };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    select(svgRef.current).selectAll("*").remove();

    const svg = select(svgRef.current)
      .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = scaleBand()
      .domain(data.map((d) => d.year.toString()))
      .range([0, width])
      .padding(0.2);

    // xAxis
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        axisBottom(x).tickValues(
          data
            .map((d) => d.year)
            .filter((year) => year % 10 === 0)
            .map((year) => year.toString())
        )
      )
      .attr("color", "white")
      .style("font-size", function () {
        const calculatedSize = isSmallDesktopHeight ? 24 : !isDesktop ? 14 : 20;
        return `${calculatedSize}px`;
      })
      .style("font-family", '"Inter", sans-serif');

    const y = scaleLinear()
      .domain([0, max(data, (d) => d.speeches_count)!])
      .nice()
      .range([height, 0]);

    // yAxis
    svg
      .append("g")
      .call(
        axisLeft(y)
          .ticks(6)
          .tickFormat((val) => val.toString())
      )
      .attr("color", "white")
      .style("font-size", function () {
        const calculatedSize = isSmallDesktopHeight ? 24 : !isDesktop ? 14 : 20;
        return `${calculatedSize}px`;
      })
      .style("font-family", '"Inter", sans-serif');

    // draw bars
    const bars = svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.year.toString())!)
      .attr("y", height)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "#C3896C")
      .attr("class", "bar");

    // animate bars
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "center 57.5%",
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true,
      },
    });

    // use stagger to show each bar with a slightly offset
    // change its attributes (heights) if scrolled to trigger
    tl.to(bars.nodes(), {
      attr: {
        y: (index: number) => {
          const d = data[index];
          return y(d.speeches_count);
        },
        height: (index: number) => {
          const d = data[index];
          return height - y(d.speeches_count);
        },
      },
      duration: 0.75,
      ease: "power2.out",
      stagger: 0.01,
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [containerHeight, containerWidth, data, isDesktop, isSmallDesktopHeight]);

  return (
    <Box sx={wrapperStyles} ref={wrapperRef}>
      <Box sx={containerStyles} ref={containerRef}>
        <Typography variant="h2" mb={"2.4rem"} width={"84vw"}>
          Anzahl der Reden über das Thema Gleichberechtigung pro Jahr
        </Typography>
        <svg ref={svgRef} width={isDesktop ? "75%" : "80%"} />
      </Box>
    </Box>
  );
};

export default EqualitySpeechesDiagram;
