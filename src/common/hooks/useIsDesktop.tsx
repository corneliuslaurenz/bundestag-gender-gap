import { useState, useEffect } from "react";

/**
 * Hook checks if screen width is at least a given value.
 */
const useIsDesktop = (breakpoint: number = 950) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > breakpoint);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > breakpoint);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isDesktop;
};

export default useIsDesktop;
