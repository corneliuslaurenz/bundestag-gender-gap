import { useRef, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { scaleLinear, scaleBand, select } from "d3";
import topics_distribution_men from "../../common/data/topics_distribution_men.json";
import topics_distribution_women from "../../common/data/topics_distribution_women.json";
import useIsDesktop from "../../common/hooks/useIsDesktop";
import { SortingOrder } from "../../common/constants";
import GenderSwitch from "../../common/components/GenderSwitch/GenderSwitch";
import {
  headingContainerStyle,
  subHeadingContainerStyle,
  svgWrapperStyle,
  h1AlternativeStyle,
  wrapperStyle,
} from "./TopicsDistributionDiagram.styles";

interface TopicData {
  position: number;
  topic: string;
  percentage: number;
}

// provide responsive text style for the diagram
const getResponsiveTextStyle = (isTopic: boolean) => {
  const width = window.innerWidth;

  if (width <= 650) {
    return {
      fontSize: "0.75rem",
      letterSpacing: "0",
    };
  } else if (width <= 950) {
    return {
      fontSize: "0.75rem",
      letterSpacing: "-0.5px",
    };
  } else if (width <= 1280) {
    return {
      fontSize: isTopic ? "1rem" : "0.75rem",
      letterSpacing: "-0.5px",
    };
  } else {
    return {
      fontSize: "1rem",
      letterSpacing: "-0.5px",
    };
  }
};

/**
 * Component for topic distribution interactive diagram.
 * Can be filteres by gender and sorting direction.
 */
const TopicsDistributionDiagram = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isWoman, setIsWoman] = useState(true);
  const [sorting, setSorting] = useState<SortingOrder>(SortingOrder.Asc);
  const [data, setData] = useState(topics_distribution_men as TopicData[]);
  const [topTopics, setTopTopics] = useState(
    data.slice(0, 10).map((d) => d.topic)
  );

  const isLargeScreen = useIsDesktop(1250);

  // find data for the ten topics
  // that are being displayed
  const [displayData, setDisplayData] = useState<TopicData[]>(() =>
    topTopics.map((topic) => {
      const d = data.find((t) => t.topic === topic)!;
      return { ...d };
    })
  );

  /**
   * If gender changes: Update data states.
   */
  useEffect(() => {
    setData(
      isWoman
        ? (topics_distribution_women as TopicData[])
        : (topics_distribution_men as TopicData[])
    );

    // create reversed array
    const reversed = data.slice(18, 28);
    const sortedTopics: TopicData[] = [];
    reversed.map((_, i) => {
      sortedTopics.push(reversed[i]);
    });

    // choose correct array
    // depending on sorting state
    const arrayToChoose =
      sorting === SortingOrder.Asc
        ? data.slice(0, 10).map((d) => d.topic)
        : sortedTopics;

    setTopTopics(arrayToChoose.map((d) => (d as unknown as TopicData).topic));

    // sort array
    const sortedData =
      sorting === SortingOrder.Asc
        ? data.slice(0, 10)
        : (arrayToChoose as unknown as TopicData[]).reverse();

    // set to be displayed data
    setDisplayData((prev) =>
      prev.map((item, index) => {
        const updatedData = sortedData[index];
        if (!updatedData) return item;
        item.percentage = updatedData.percentage;
        item.topic = updatedData.topic;
        item.position = updatedData.position;
        return item;
      })
    );
  }, [isWoman, data, sorting]);

  /**
   * Draw and change diagram, depending on data that should be shown.
   */
  useEffect(() => {
    if (!svgRef.current) return;

    const width = window.innerWidth * 0.84;
    const height =
      window.innerHeight > 650
        ? window.innerHeight * 0.8
        : window.innerHeight * 1.4;

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = scaleLinear().domain([0, 100]).range([0, width]);
    const y = scaleBand().domain(topTopics).range([0, height]);

    // for decreasing opacity for each bar
    const opacityArray = [
      1, 0.93, 0.86, 0.79, 0.72, 0.65, 0.58, 0.51, 0.44, 0.37,
    ];

    // prepare style objects
    const { fontSize: textFontSize, letterSpacing: textSpacing } =
      getResponsiveTextStyle(true);

    const { fontSize: percFontSize, letterSpacing: percSpacing } =
      getResponsiveTextStyle(false);

    const generalTextStyles = {
      fontFamily: '"Inter", sans-serif',
      fontWeight: "700",
      lineHeight: "1.2",
      fill: "white",
    };

    const barGroups = svg
      .selectAll<SVGGElement, TopicData>(".bar-group")
      .data(displayData, (d: TopicData) => d.position);

    const barGroupsEnter = barGroups
      .enter()
      .append("g")
      .attr("class", "bar-group")
      .attr("transform", (d) => `translate(0, ${y(d.topic)})`);

    // main bar with decreasing opacity
    barGroupsEnter
      .append("rect")
      .attr("class", "bar-main")
      .attr("x", 0)
      .attr("width", (d) => x(d.percentage))
      .attr("height", y.bandwidth())
      .attr("fill", "#321B18")
      .attr("opacity", (_d, i) => opacityArray[i]);

    // remaining, smaller bar with decreasing opacity
    barGroupsEnter
      .append("rect")
      .attr("class", "bar-remaining")
      .attr("x", (d) => x(d.percentage))
      .attr("width", (d) => x(100 - d.percentage))
      .attr("height", y.bandwidth())
      .attr("fill", "#321B18")
      .attr("opacity", (_d, i) => 1 - (1.15 - opacityArray[i] * 0.8));

    // left topic text
    barGroupsEnter
      .append("text")
      .text((d) => `${d.position}. ${d.topic}`)
      .attr("x", isLargeScreen ? 64 : 50)
      .attr("y", y.bandwidth() / 2)
      .attr("dy", "0.35rem")
      .style("font-family", generalTextStyles.fontFamily)
      .style("font-weight", generalTextStyles.fontWeight)
      .style("line-height", generalTextStyles.lineHeight)
      .style("letter-spacing", textSpacing)
      .style("fill", generalTextStyles.fill)
      .style("font-size", textFontSize);

    // right percentage text
    barGroupsEnter
      .append("text")
      .attr("class", "percentage-text")
      .text((d) => `${d.percentage.toFixed(1)}%`)
      .attr("x", isLargeScreen ? (d) => x(d.percentage) + 64 : x(100) - 50)
      .attr("y", y.bandwidth() / 2)
      .attr("dy", "0.35rem")
      .style("font-family", generalTextStyles.fontFamily)
      .style("font-weight", generalTextStyles.fontWeight)
      .style("line-height", generalTextStyles.lineHeight)
      .style("letter-spacing", percSpacing)
      .style("fill", generalTextStyles.fill)
      .style("font-size", percFontSize)
      .style("text-anchor", isLargeScreen ? "start" : "end");

    // merge all bargroups
    const merged = barGroups.merge(barGroupsEnter);

    // update left topic text
    merged
      .select("text:not(.percentage-text)")
      .text((d) => `${d.position}. ${d.topic}`)
      .attr("x", isLargeScreen ? 64 : 20);

    // update right percentage text
    merged
      .select("text.percentage-text")
      .text((d) => `${d.percentage.toFixed(1)} %`)
      .transition()
      .duration(1000)
      .attr("x", (d: TopicData) => {
        if (isLargeScreen) {
          return (
            x(d.percentage) +
            (sorting === SortingOrder.Asc ? 32 : isWoman ? 192 : 32)
          );
        }
        return x(100) - 25;
      });

    // handle morph transition for data change
    merged
      .select("rect.bar-main")
      .transition()
      .duration(1000)
      .attr("width", (d) => x(d.percentage));

    merged
      .select("rect.bar-remaining")
      .transition()
      .duration(1000)
      .attr("x", (d) => x(d.percentage))
      .attr("width", (d) => x(100 - d.percentage));

    barGroups.exit().remove();
  }, [displayData, topTopics, isLargeScreen, sorting, isWoman]);

  return (
    <Box sx={wrapperStyle}>
      <Box sx={headingContainerStyle}>
        <Typography variant="h2">Themenverteilung bei Reden</Typography>
        <Typography variant="h1" sx={h1AlternativeStyle}>
          Macht das Geschlecht einen Unterschied?
        </Typography>
      </Box>

      <Box sx={subHeadingContainerStyle}>
        <Typography variant="h2" mt={"20vh"}>
          Top 10 der Redeanteile zu einem Thema von 1949 bis 2023 nach
          Geschlecht
        </Typography>
        <Typography variant="h3" mt={"1rem"}>
          Untersuchung 28 ausgewählter Themen
        </Typography>
        <GenderSwitch
          isWoman={isWoman}
          setIsWoman={setIsWoman}
          sorting={sorting}
          setSorting={setSorting}
        />
      </Box>

      <Box sx={svgWrapperStyle}>
        <svg ref={svgRef} style={{ width: "84vw" }} />
      </Box>
    </Box>
  );
};
export default TopicsDistributionDiagram;
