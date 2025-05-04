import { useState, useEffect } from "react";

/**
 * Hook checks if screen height is at least a given value.
 */
const useIsLargeHeight = (breakpoint: number = 950) => {
  const [isSmallHeight, setIsSmallHeight] = useState(
    window.innerHeight > breakpoint
  );

  useEffect(() => {
    const handleResize = () =>
      setIsSmallHeight(window.innerHeight > breakpoint);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isSmallHeight;
};

export default useIsLargeHeight;
