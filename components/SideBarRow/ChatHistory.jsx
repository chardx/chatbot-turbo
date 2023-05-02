import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatList from "./ChatList";
import { getConversationHistory } from "../../services/firebaseService";

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const conversation = useSelector((state) => state.messages);
  const handleRefreshConversation = async () => {
    const history = await getConversationHistory();
    setChatHistory(history);
  };

  useEffect(() => {
    handleRefreshConversation();
  }, [conversation]);

  return (
    <div className="text-black p-4">
      <h3 className="text-2xl font-bold mb-6">Chat History</h3>
      <div className="bg-white shadow-lg  rounded-lg overflow-y-scroll h-96">
        <ul className="divide-y divide-gray-700">
          {chatHistory.map((chat) => (
            <ChatList key={chat.id} chat={chat} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatHistory;
