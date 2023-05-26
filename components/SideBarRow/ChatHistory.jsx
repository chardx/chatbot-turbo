import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getConversationHistory } from "../../services/firebaseService";

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const conversation = useSelector((state) => state.messages);
  const handleRefreshConversation = async () => {
    const history = await getConversationHistory();
    console.log(history);
    setChatHistory(history);
  };

  useEffect(() => {
    if (import.meta.env.VITE_FIREBASE !== "disabled") {
      handleRefreshConversation();
    }
  }, [conversation]);

  return (
    <div className="h-auto text-black p-4">
      <div
        className="bg-zinc-800 shadow-lg  rounded-lg overflow-y-scroll h-96 
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
