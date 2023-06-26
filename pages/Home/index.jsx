import React, { useEffect } from "react";
import ChatBox from "../../components/ChatBox";
import AI_List from "../../components/SideBar/RightSideBar/AI_List";
import ChatHistory from "../../components/SideBar/LeftSideBar/ChatHistory";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import "../../styles/globals.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";
import { motion } from "framer-motion";
import { useWindowSize } from "../../hooks/useWindowSize.js";

const HomePage = () => {
  const rightDrawerOpen = useSelector((state) => state.ui.rightDrawerOpen);
  const leftDrawerOpen = useSelector((state) => state.ui.leftDrawerOpen);
  const isMobile = useSelector((state) => state.ui.isMobile);

  const dispatch = useDispatch();

  const [width, height] = useWindowSize();
  //Custom hook to handle updating of isMobile state
  useEffect(() => {
    if (!isMobile && width < 768) {
      console.log("Updated to Mobile");
      dispatch(uiActions.updateMobileState(true));
      dispatch(uiActions.closeAllDrawers());
    } else if (isMobile && width >= 768) {
      console.log("Updated to Desktop");
      dispatch(uiActions.updateMobileState(false));
      dispatch(uiActions.openAllDrawers());
    }
  }, [width, height]);

  const handleLeftHamburgerClick = () => {
    if (!leftDrawerOpen) {
      dispatch(uiActions.updateLeftDrawerOpen(true));
    } else if (leftDrawerOpen) {
      dispatch(uiActions.updateLeftDrawerOpen(false));
    }
  };

  const handleRightHamburgerClick = () => {
    if (!rightDrawerOpen) {
      dispatch(uiActions.updateRightDrawerOpen(true));
    } else if (rightDrawerOpen) {
      dispatch(uiActions.updateRightDrawerOpen(false));
    }
  };
  // const isMobile = () => {
  //   const userAgent =
  //     typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  //   const mobileRegex =
  //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  //   return mobileRegex.test(userAgent);
  // };

  return (
    <main className="flex h-[75vh] md:h-screen w-screen flex-col text-white">
      <div className="flex h-full w-full pt-0">
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: leftDrawerOpen ? "0%" : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`${
            leftDrawerOpen ? "block md:static md:block" : "hidden"
          } absolute z-50 bg-zinc-900 md:w-3/12 2xl:w-2/12 h-full`}
        >
          <ChatHistory />
          <Menu />
        </motion.aside>
        <div className="fixed top-0 md:static flex-auto w-full h-full md:w-9/12 2xl:w-8/12  bg-gray-200">
          <Header
            onLeftHamburgerClick={handleLeftHamburgerClick}
            onRightHamburgerClick={handleRightHamburgerClick}
          />

          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ChatBox />
          </ErrorBoundary>
        </div>
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: rightDrawerOpen ? "0%" : "100%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`flex-auto ${
            rightDrawerOpen ? "block md:static md:block" : "hidden"
          } absolute  bg-zinc-900 w-[70%] right-0 md:w-[25%] md:text-xs md:max-w-sm h-screen`}
        >
          <AI_List />
        </motion.aside>
      </div>
    </main>
  );
};

export default HomePage;
