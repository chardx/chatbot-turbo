import React, { useRef, useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "./ChatList";
import { getConversationHistory } from "../../../services/firebaseService";
import { chatHistoryActions } from "../../../store/chatHistory";
import { uiActions } from "../../../store/ui";
import CloseButton from "../../UI/Svg/CloseButton";

const ChatHistory = memo(() => {
  const chatHistoryRef = useRef();

  // const [chatHistory, setChatHistory] = useState([]);
  const chatHistory = useSelector((state) => state.chatHistory.history);
  const userID = useSelector((state) => state.auth.userInfo.userID);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [counter, setCounter] = useState(0);
  const isMobile = useSelector((state) => state.ui.isMobile);

  const dispatch = useDispatch();
  const uiDispatch = useDispatch();

  const handleRefreshConversation = async () => {
    if (!isLoggedIn) return;
    setCounter((prev) => prev + 1);

    const history = await getConversationHistory(userID);
    console.log(`Chat History rendered: ${counter} time/s`);
    dispatch(chatHistoryActions.refreshHistory(history));
  };

  useEffect(() => {
    if (import.meta.env.VITE_FIREBASE !== "disabled") {
      handleRefreshConversation();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    console.log("Chat History Updated");
  }, [chatHistory]);

  const handleCloseLeftDrawer = () => {
    uiDispatch(uiActions.updateLeftDrawerOpen(false));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        chatHistoryRef.current &&
        !chatHistoryRef.current.contains(event.target)
      ) {
        // Close the sidebar here
        console.log("Handle Close");
        console.log(event.target);
        handleCloseLeftDrawer();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={chatHistoryRef} className="h-auto text-black p-4">
      <button onClick={handleCloseLeftDrawer} className="text-white">
        <CloseButton />
      </button>
      <div
        className="bg-zinc-900 shadow-lg  rounded-lg overflow-y-scroll h-96 
      scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-800"
      >
        <ul className="divide-y divide-gray-700">
          {chatHistory &&
            chatHistory.map((chat) => <ChatList key={chat.id} chat={chat} />)}
        </ul>
      </div>
    </div>
  );
});

export default ChatHistory;
