import ChatBox from "../../components/ChatBox";
import AI_List from "../../components/SideBarRow/AI_List";
import ChatHistory from "../../components/SideBarRow/ChatHistory";
import Header from "../../components/Header";
import Menu from "../../components/Menu";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary";
import "../../styles/globals.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const HomePage = () => {
  const rightDrawerOpen = useSelector((state) => state.ui.rightDrawerOpen);
  const dispatch = useDispatch();

  const handleRightHamburgerClick = () => {
    console.log("I was clicked!");
    if (!rightDrawerOpen) {
      console.log("I am in Mobile");
      dispatch(uiActions.updateRightDrawerOpen(true));
    } else if (rightDrawerOpen) {
      console.log("I am not in Mobile");
      dispatch(uiActions.updateRightDrawerOpen(false));
    }
  };
  const isMobile = () => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobileRegex =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    return mobileRegex.test(userAgent);
  };

  return (
    <main className="flex h-screen w-screen flex-col text-white">
      <div className="flex h-full w-full pt-0">
        <aside className="z-50 bg-zinc-900 md:w-3/12 2xl:w-2/12 h-full hidden md:block">
          <ChatHistory />
          <Menu />
        </aside>
        <div className="w-full h-full md:w-9/12 2xl:w-8/12  bg-gray-200">
          <Header onRightHamburgerClick={handleRightHamburgerClick} />

          <ErrorBoundary fallback={<p>Something went wrong</p>}>
            <ChatBox />
          </ErrorBoundary>
        </div>
        <aside
          className={`${
            rightDrawerOpen ? "block" : "hidden"
          } absolute  bg-zinc-900 w-[50%] right-0 sm:w-full h-full sm:static 2xl:w-2/12 2xl:block`}
        >
          <AI_List />
        </aside>
      </div>
    </main>
  );
};

export default HomePage;
