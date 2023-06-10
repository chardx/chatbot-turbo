import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatList from "./ChatList";
import { getConversationHistory } from "../../services/firebaseService";
import { chatHistoryActions } from "../../store/chatHistory";
const ChatHistory = () => {
  // const [chatHistory, setChatHistory] = useState([]);
  const chatHistory = useSelector((state) => state.chatHistory.history);
  const userID = useSelector((state) => state.auth.userInfo.userID);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

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

  return (
    <div className="h-auto text-black p-4">
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
};

export default ChatHistory;
