import React from "react";
import ChatList from "./ChatList";

const ChatHistory = () => {
  return (
    <div className="text-black p-4">
      <h3 className="text-2xl font-bold mb-6">Chat History</h3>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <ChatList />
      </div>
    </div>
  );
};

export default ChatHistory;
