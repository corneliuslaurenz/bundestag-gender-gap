import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Box } from "@mui/material";
import LandingPage from "./00LandingPage/LandingPage";
import Overview from "./01Overview/Overview";
import Speeches from "./02Speeches/Speeches";
import {
  appWrapperStyle,
  contentWrapperStyle,
  overviewSectionStyle,
  speechesSectionStyle,
  topicsSectionStyle,
} from "./App.styles";
import Menu from "./common/components/Menu/Menu";
import Topics from "./03Topics/Topics";
import AboutPage from "./InformationSections/AboutPage";

import MobilePopup from "./common/components/MobilePopup/MobilePopup";
import Footer from "./common/components/Footer/Footer";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/**
 * App component as a start of the application.
 */
function App() {
  const [aboutPageIsOpen, setAboutPageIsOpen] = useState(false);
  const [genderCommentOpen, setGenderCommentOpen] = useState(false);
  const [dataCommentOpen, setDataCommentOpen] = useState(false);
  const [contactPageIsOpen, setContactPageIsOpen] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [overviewIsReached, setOverviewIsReached] = useState(false);
  const [speechesIsReached, setSpeechesIsReached] = useState(false);
  const [topicsIsReached, setTopicsIsReached] = useState(false);

  const refOverview = useRef<HTMLElement | null>(null);
  const refSpeeches = useRef<HTMLElement | null>(null);
  const refTopics = useRef<HTMLElement | null>(null);

  const anyModalIsOpen =
    aboutPageIsOpen ||
    genderCommentOpen ||
    dataCommentOpen ||
    contactPageIsOpen ||
    popupIsOpen;
  const overviewIsActive = overviewIsReached && !anyModalIsOpen;
  const speechesIsActive = speechesIsReached && !anyModalIsOpen;
  const topicsIsActive = topicsIsReached && !anyModalIsOpen;

  /**
   * Initially: Add event listeners.
   */
  useEffect(() => {
    // to prevent timing and render problems: refresh ScrollTrigger
    // double refresh as a workaround
    const waitForRefresh = () => {
      if (document.readyState === "complete") {
        ScrollTrigger.refresh();
        setTimeout(() => ScrollTrigger.refresh(), 500);
      } else {
        setTimeout(waitForRefresh, 500);
      }
    };

    waitForRefresh();

    // define scroll listener
    // to show an active indicator (a dot on the navigation button)
    // if sections position is reached
    const handleScroll = () => {
      if (!refOverview?.current || !refSpeeches.current || !refTopics.current)
        return;

      const overviewPosition = refOverview.current.getBoundingClientRect();
      const speechesPosition = refSpeeches.current.getBoundingClientRect();
      const topicsPosition = refTopics.current.getBoundingClientRect();

      setOverviewIsReached(
        window.scrollY >= overviewPosition.top - 20 + window.scrollY
      );
      setSpeechesIsReached(
        window.scrollY >= speechesPosition.top - 20 + window.scrollY
      );
      setTopicsIsReached(
        window.scrollY >= topicsPosition.top - 20 + window.scrollY
      );
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box sx={appWrapperStyle}>
      <MobilePopup popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen} />
      <AboutPage
        aboutPageIsOpen={aboutPageIsOpen}
        setAboutPageIsOpen={setAboutPageIsOpen}
        genderCommentOpen={genderCommentOpen}
        setGenderCommentOpen={setGenderCommentOpen}
        dataCommentOpen={dataCommentOpen}
        setDataCommentOpen={setDataCommentOpen}
        contactPageIsOpen={contactPageIsOpen}
        setContactPageIsOpen={setContactPageIsOpen}
      />
      <Box sx={contentWrapperStyle}>
        {!popupIsOpen && (
          <Menu
            setAboutPageIsOpen={setAboutPageIsOpen}
            setGenderCommentOpen={setGenderCommentOpen}
            setDataCommentOpen={setDataCommentOpen}
            setContactPageIsOpen={setContactPageIsOpen}
            overviewIsActive={overviewIsActive}
            speechesIsActive={speechesIsActive}
            topicsIsActive={topicsIsActive}
          />
        )}
        <LandingPage />
        <Box id="overview" sx={overviewSectionStyle} ref={refOverview}>
          <Overview />
        </Box>
        <Box id="speeches" sx={speechesSectionStyle} ref={refSpeeches}>
          <Speeches />
        </Box>
        <Box id="topics" sx={topicsSectionStyle} ref={refTopics}>
          <Topics />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
