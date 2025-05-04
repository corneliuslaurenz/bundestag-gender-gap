import  { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import topics_exploration from "../../common/data/topics_exploration.json";
import { PercentageDisplay } from "../../common/components/PercentageDisplay/PercentageDisplay";
import TimeLine from "../../common/components/TimeLine/TimeLine";
import RingChart from "../../common/components/RingChart/RingChart";
import SingleTopicGroup from "../../common/components/SingleTopicGroup/SingleTopicGroup";
import {
  chartContainerStyle,
  containerStyle,
  contentWrapperStyle,
  headerWrapperStyle,
  percentageDisplayStyle,
  percentageWrapperStyle,
  statsInnerWrapperStyle,
  statsWrapperStyle,
  topicsWrapperStyle,
  typographyStyle,
} from "./TopicsExplorationDiagram.styles";
import { TopicYearlyData } from "../../common/constants";
import { h1AlternativeStyle } from "../TopicDistributionDiagram/TopicsDistributionDiagram.styles";
import useIsDesktop from "../../common/hooks/useIsDesktop";
import useIsLargeHeight from "../../common/hooks/useIsLargeHeight";

interface TopicData {
  src: string;
  title: string;
  topics: { [topicName: string]: TopicYearlyData };
}

const TopicsExplorationDiagram = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Sozial- und Gesellschaftspolitik"
  );
  const [selectedTopic, setSelectedTopic] = useState<string | null>(
    "Gleichberechtigung"
  );
  const [startYear, setStartYear] = useState<number>(1960);
  const [endYear, setEndYear] = useState<number>(2010);
  const [femaleAvg, setFemaleAvg] = useState<number>(25);
  const [catIconPath, setCatIconPath] = useState<string | null>("");
  const [selectedTopicObject, setSelectedTopicObject] =
    useState<TopicYearlyData>();
  const topicsRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);

  const isDesktop = useIsDesktop(950);
  const isLargeHeight = useIsLargeHeight(800);

  const data = topics_exploration as unknown as TopicData[];

  // calculate average percentage of a given topic or category
  const calculateAverage = useCallback(
    (selectedCategory: string, selectedTopic: string): number => {
      if (!selectedCategory) return -1;

      // get category object
      const categoryObject = data.find((d) => d.title === selectedCategory);
      if (!categoryObject) return -1;

      // calculate average for single topic
      if (selectedTopic) {
        // get topic object
        const topicData = categoryObject.topics[selectedTopic];
        if (!topicData) return -1;

        // accumulate total percentage of topic in year range
        const { total, count } = Object.entries(topicData).reduce(
          (totalPercentage, [yearString, yearPercentage]) => {
            const year = Number(yearString);
            if (year >= startYear && year <= endYear) {
              totalPercentage.total += yearPercentage.female_percentage;
              totalPercentage.count += 1;
            }
            return totalPercentage;
          },
          { total: 0, count: 0 }
        );

        // return average percentage of single topic
        return total / count;
      }

      // get every topic of the category
      const topicNames = Object.keys(categoryObject.topics);
      if (topicNames.length === 0) return -1;

      // calculate average for category with recursion
      // accumulate total percentage of every topic of the categroy in year range
      const total = topicNames.reduce(
        (totalPercentage, name) =>
          totalPercentage + calculateAverage(selectedCategory, name),
        0
      );

      // return average percentage of whole category
      return total / topicNames.length;
    },
    [data, startYear, endYear]
  );

  /**
   * Set new selectedTopicObject if year or data changes.
   * Used for line chart on timeline.
   */
  useEffect(() => {
    setFemaleAvg(calculateAverage(selectedCategory ?? "", selectedTopic ?? ""));

    // set categoryObject for single topic
    if (selectedCategory && selectedTopic) {
      // get topic object to use for line chart on timeline
      const categoryObject =
        data.find((d) => d.title === selectedCategory) ?? ({} as TopicData);
      setSelectedTopicObject(categoryObject.topics[selectedTopic]);

      // set categoryObject for whole category
    } else if (selectedCategory && !selectedTopic) {
      const categoryObject =
        data.find((d) => d.title === selectedCategory) ?? ({} as TopicData);
      const topics = Object.values(categoryObject.topics);

      // collect all years we have data for
      // use a set to get distinct years
      const years = [...new Set(topics.flatMap((topic) => Object.keys(topic)))];

      // get topic object to use for line chart on timeline
      // create an object with accumulation of yearly
      const categoryTopicObject: TopicYearlyData = years.reduce(
        (totalTopicObject, year) => {
          // get all percentages of the topics in that year
          const percentageArray = topics
            .map((topic) => topic[year]?.female_percentage)
            .filter((value: number) => value !== undefined);

          // calculate average women percentage
          // of every percentages of the topics in that year
          const averagePercentage =
            percentageArray.length > 0
              ? percentageArray.reduce(
                  (totalPercentage, percentage) => totalPercentage + percentage,
                  0
                ) / percentageArray.length
              : undefined;

          // create final object
          return averagePercentage !== undefined
            ? {
                ...totalTopicObject,
                [year]: {
                  female_percentage: averagePercentage,
                  male_percentage: 100 - averagePercentage,
                },
              }
            : totalTopicObject;
        },
        {} as TopicYearlyData
      );

      setSelectedTopicObject(categoryTopicObject);
    }
  }, [
    selectedCategory,
    selectedTopic,
    startYear,
    endYear,
    calculateAverage,
    data,
  ]);

  /**
   * Set resize handler to set the content height.
   */
  useEffect(() => {
    const handleResize = () => {
      if (topicsRef.current && contentRef.current) {
        const topicsHeight = topicsRef.current.clientHeight;

        const heightFactor = !isLargeHeight ? 2.46 : isDesktop ? 2.66 : 2.46;

        contentRef.current.style.height = `${topicsHeight * heightFactor}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
  }, [isDesktop, isLargeHeight]);

  return (
    <Box sx={containerStyle}>
      <Box sx={headerWrapperStyle}>
        <Typography variant="h2">Themenverteilung in der Übersicht</Typography>
        <Typography variant="h1" sx={h1AlternativeStyle}>
          Politik im Wandel <br /> der Zeit
        </Typography>
      </Box>

      <Box
        sx={{
          ...contentWrapperStyle,
          height: topicsRef.current?.clientHeight ?? "fit-content",
          width: "100%",
        }}
        ref={contentRef}
      >
        <Box ref={topicsRef} sx={topicsWrapperStyle}>
          {data?.map((val: TopicData) => (
            <SingleTopicGroup
              key={val.title}
              src={val.src}
              title={val.title}
              topics={val.topics}
              selectedCategory={selectedCategory}
              selectedTopic={selectedTopic}
              setSelectedCategory={setSelectedCategory}
              setSelectedTopic={setSelectedTopic}
              setCatIconPath={setCatIconPath}
            />
          ))}
        </Box>

        <Box sx={chartContainerStyle}>
          <RingChart
            womanPercentage={femaleAvg}
            centerText={selectedTopic ?? selectedCategory ?? ""}
            iconPath={catIconPath ?? ""}
          />
          <Box sx={percentageWrapperStyle}>
            {femaleAvg !== -1 && (
              <>
                <PercentageDisplay
                  percentage={Math.round(100 - femaleAvg)}
                  label={"Reden männlicher Abgeordneter"}
                  sx={percentageDisplayStyle}
                  isTopicExploration
                />

                <PercentageDisplay
                  percentage={Math.round(femaleAvg)}
                  label={"Reden weiblicher Abgeordneter"}
                  sx={percentageDisplayStyle}
                  left={false}
                  isTopicExploration
                />
              </>
            )}
          </Box>
          <Box sx={statsWrapperStyle}>
            <Box sx={statsInnerWrapperStyle}>
              <Typography variant="body2" sx={typographyStyle}>
                Zeitraum: {`${startYear} - ${endYear}`}
              </Typography>
              <TimeLine
                data={selectedTopicObject ?? {}}
                initialStartYear={startYear}
                initialEndYear={endYear}
                onYearRangeChange={(start, end) => {
                  setStartYear(start);
                  setEndYear(end);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TopicsExplorationDiagram;
