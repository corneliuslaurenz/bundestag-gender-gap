import { Party } from "./constants";

// return party associated color
// for given party
export const getColorForParty = (party: Party): string => {
  switch (party) {
    case Party.SPD:
      return "#E8A38C";
    case Party.CDU:
      return "#B3B3B3";
    case Party.CSU:
      return "#B3D2D5";
    case Party.FDP:
      return "#F6ECB8";
    case Party.Sonstige:
      return "#E6E6E6";
    case Party["GB/BHE"]:
      return "#CCB8C3";
    case Party["B90/GRÜNE"]:
      return "#D4E9B9";
    case Party["GRÜNE"]:
      return "#D4E9B9";
    case Party.PDS:
      return "#E9D1B8";
    case Party["DIE LINKE"]:
      return "#E4D9E8";
    case Party.AfD:
      return "#D0E6F6";
    default:
      return "#F2F2F2";
  }
};

// change english to german comma
export const changeToGermanComma = (text: string) => {
  return text.replace(".", ",");
};
