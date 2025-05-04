import { Box, Typography } from "@mui/material";
import { TopicYearlyData } from "../../constants";
import {
  categoryBoxStyle,
  iconWrapperStyle,
  wrapperStyle,
  titleStyle,
  topicsContainerStyle,
  topicStyle,
} from "./SingleTopicGroup.styles";
import useIsDesktop from "../../hooks/useIsDesktop";

/**
 * Component for single group of topics.
 * With title and topic list.
 */
const SingleTopicGroup = ({
  src,
  title,
  topics,
  selectedCategory,
  selectedTopic,
  setSelectedCategory,
  setSelectedTopic,
  setCatIconPath,
}: {
  src: string;
  title: string;
  topics: { [topicName: string]: TopicYearlyData };
  selectedCategory: string | null;
  selectedTopic: string | null;
  setSelectedCategory: (val: string | null) => void;
  setSelectedTopic: (val: string | null) => void;
  setCatIconPath: (val: string | null) => void;
}) => {
  const isCategorySelected = selectedCategory === title;
  const isMobile = !useIsDesktop(450);

  return (
    <Box sx={wrapperStyle(isCategorySelected)}>
      <Box
        sx={categoryBoxStyle}
        onClick={() => {
          setSelectedCategory(title);
          setCatIconPath(src ?? undefined);
          setSelectedTopic(null);
        }}
      >
        <Box sx={iconWrapperStyle}>
          <svg width="34px" height="34px" viewBox="0 0 256 256">
            <path d={src} fill={isCategorySelected ? "white" : "#D6B29B"} />
          </svg>
        </Box>

        {/* be sure, that the categories will break at the same time */}
        <Typography
          sx={{
            ...titleStyle(isCategorySelected),
            ...(title === "Sozial- und Gesellschaftspolitik" ||
            title === "Umwelt- und Gesundheitspolitik"
              ? {
                  "@media (max-width: 450px)": {
                    width: "80%",
                    alignSelf: "center",
                  },
                }
              : {}),
            ...(title === "Infrastruktur- und Digitalpolitik" ||
            title === "Wirtschafts- und Finanzpolitik"
              ? {
                  "@media (max-width: 450px)": {
                    width: "68%",
                    alignSelf: "center",
                  },
                }
              : {}),
          }}
        >
          {/* be sure, that the categories will break at the same time */}
          {title === "Sozial- und Gesellschaftspolitik" && isMobile
            ? "Sozial- und Gesellschafts-politik"
            : title === "Umwelt- und Gesundheitspolitik" && isMobile
            ? "Umwelt- und Gesundheits-politik"
            : title}
        </Typography>
      </Box>

      <Box sx={topicsContainerStyle(isCategorySelected)}>
        {Object.keys(topics).map((val: string) => {
          const isTopicSelected =
            (selectedCategory === title && selectedTopic === null) ||
            selectedTopic === val;

          {
            /* be sure, that the topics will break at the same time */
          }
          return isCategorySelected ? (
            <Typography
              key={val}
              onClick={() => {
                setSelectedTopic(val);
                setSelectedCategory(title);
                setCatIconPath(null);
              }}
              sx={{
                ...topicStyle(isCategorySelected, isTopicSelected),
                ...(val === "Schwangerschaftsabbruch " ||
                val === "Studium und Ausbildungsförderung"
                  ? { width: "70%", alignSelf: "center" }
                  : {}),
                ...(val === "Sozial- und Gesellschaftspolitik" ||
                val === "Umwelt- und Gesundheitspolitik"
                  ? { width: "70%", alignSelf: "center" }
                  : {}),
              }}
            >
              {/* be sure, that the topics will break at the same time */}
              {val === "Schwangerschaftsabbruch "
                ? "Schwangerschafts-abbruch"
                : val === "Studium und Ausbildungsförderung"
                ? "Studium und Ausbildungs-förderung"
                : val === "Sozial- und Gesellschaftspolitik"
                ? "Sozial- und Gesellschafts-politik"
                : val === "Umwelt- und Gesundheitspolitik"
                ? "Umwelt- und Gesundheits-politik"
                : val}
            </Typography>
          ) : null;
        })}
      </Box>
    </Box>
  );
};

export default SingleTopicGroup;
