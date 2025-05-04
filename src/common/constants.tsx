export enum Party {
  SPD = "SPD",
  CDU = "CDU",
  CSU = "CSU",
  FDP = "FDP",
  Sonstige = "Sonstige",
  "GB/BHE" = "GB/BHE",
  "B90/GRÜNE" = "B90/GRÜNE",
  PDS = "PDS",
  "DIE LINKE" = "DIE LINKE",
  AfD = "AfD",
  GRÜNE = "GRÜNE",
}

export type Distribution = { [key in Party]?: number };

export type SingleParliament = {
  number: number;
  start_year: number;
  end_year: number;
  total_members: number;
  number_of_women: number;
  number_of_men: number;
  total_woman_speeches: number;
  total_man_speeches: number;
  total_speeches: number;
  percentage_of_women: number;
  impressionURL: string;
  parliamentURL: string;
  percentageURL: string;
  seatsURL: string;
  seats_distribution?: { [key in Party]?: number };
};

export enum ControlMode {
  SpeechesCount = "speeches_count",
  SpeechesLength = "speeches_length",
}

export enum SortingOrder {
  Asc = "asc",
  Desc = "desc",
}

interface GenderTopicData {
  female_percentage: number;
  male_percentage: number;
}

export interface TopicYearlyData {
  [year: string]: GenderTopicData;
}

// array for reactions indicators
export const barArray = [
  {
    title: "Einspruch",
    indicator_women: 1.15,
    indicator_men: 1.18,
  },
  {
    title: "Unruhe",
    indicator_women: 1.14,
    indicator_men: 1.26,
  },
  {
    title: "Abscheu",
    indicator_women: 1.08,
    indicator_men: 1.22,
  },
  {
    title: "Zustimmung",
    indicator_women: 1.28,
    indicator_men: 1.36,
  },
  {
    title: "Gelächter",
    indicator_women: 1.24,
    indicator_men: 1.36,
  },
  {
    title: "Heiterkeit",
    indicator_women: 1.23,
    indicator_men: 1.5,
  },
  {
    title: "Applaus",
    indicator_women: 3.45,
    indicator_men: 3.65,
  },
];
