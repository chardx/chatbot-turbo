import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "./ChatList";
import { getConversationHistory } from "../../../services/firebaseService";
import { chatHistoryActions } from "../../../store/chatHistory";
import { uiActions } from "../../../store/ui";

const ChatHistory = memo(() => {
  // const [chatHistory, setChatHistory] = useState([]);
  const chatHistory = useSelector((state) => state.chatHistory.history);
  const userID = useSelector((state) => state.auth.userInfo.userID);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();
  const uiDispatch = useDispatch();

  const handleRefreshConversation = async () => {
    if (!isLoggedIn) return;
    setCounter((prev) => prev + 1);

    const history = await getConversationHistory(userID);
    console.log(`Chat History rendered: ${counter} time/s`);

    console.log(history);
    console.log("chatHistory");
    console.log(chatHistory);
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

  return (
    <div className="h-auto text-black p-4">
      <button onClick={handleCloseLeftDrawer} className="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
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
