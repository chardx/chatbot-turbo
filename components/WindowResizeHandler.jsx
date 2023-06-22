import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";
import debounce from "lodash/debounce";

const WindowResizeHandler = () => {
  const uiDispatch = useDispatch();

  useEffect(() => {
    const handleResize = debounce(() => {
      console.log("I am in Mobile");
      uiDispatch(uiActions.updateMobileState(window.innerWidth < 768));
    }, 200);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return null; // or <></> for React fragments
};

export default WindowResizeHandler;
