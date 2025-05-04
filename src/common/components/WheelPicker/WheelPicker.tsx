import { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import gsap from "gsap";
import {
  wrapperStyle,
  itemBoxStyle,
  listStyle,
  typographyStyle,
} from "./WheelpIcker.styles";

type WheelPickerProps = {
  items: string[];
  onChange?: (willIncrease: boolean) => void;
  index: number;
  width: number;
  setIndex: (index: number) => void;
  isSpeechesLength?: boolean;
};

/**
 * Component returns a wheelpicker for given items.
 */
export const WheelPicker = ({
  items,
  setIndex,
  onChange,
  index,
  width,
  isSpeechesLength,
}: WheelPickerProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  // loop items array tree times
  // to simulate wheel behavior
  const loopedItems = [...items, ...items, ...items];
  // set index to the middle
  const shiftedIndex = index + items.length;
  const itemWidth = width / 3;

  /**
   * Animate list that the selected item is in the middle.
   * If index changes.
   */
  useEffect(() => {
    if (!listRef.current) return;

    // calculate new x shift for moving the list
    // item width is added, because selected item should be centered
    const targetX = -(shiftedIndex * itemWidth) + itemWidth;

    gsap.to(listRef.current, {
      x: targetX,
      duration: 0.55,
      ease: "power2.out",
    });
  }, [index, itemWidth, shiftedIndex]);

  /**
   * Set new index when new year range is clicked.
   * @param clickedIndex
   */
  const handleClick = (clickedIndex: number) => {
    const originalIndex = clickedIndex % items.length;

    // case: from last to first item
    if (index === items.length - 1 && originalIndex === 0) {
      setIndex(0);
      onChange?.(true);
      return;
    }

    // case: from first to last item
    if (index === 0 && originalIndex === items.length - 1) {
      setIndex(items.length - 1);
      onChange?.(false);
      return;
    }

    // normal cases
    if (originalIndex > index) {
      setIndex((index + 1) % items.length);
      onChange?.(true);
    } else if (originalIndex < index) {
      setIndex((index - 1 + items.length) % items.length);
      onChange?.(false);
    }
  };

  return (
    <Box sx={{ ...wrapperStyle, width }}>
      <Box ref={listRef} sx={listStyle}>
        {/* loop all list items */}
        {/* you'll see only three items, because of the box is set to overall width / 3 */}
        {loopedItems.map((item, i) => {
          const originalIndex = i % items.length;
          const isActive = originalIndex === index;

          return (
            <Box key={i + item} sx={itemBoxStyle(isActive, width)}>
              <Typography
                variant="h3"
                onClick={() => handleClick(i)}
                sx={typographyStyle(isActive, width)}
              >
                {isSpeechesLength ? `${item}.000` : item}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
