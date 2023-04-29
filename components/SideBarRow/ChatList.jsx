import React from "react";
import { useSelector } from "react-redux";

const ChatList = ({ chat }) => {
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  const selectedAIRole = listOfAI.find((ai) => ai.id === chat.selectedAI);
  return (
    <div className="bg-gray-900 w-full h-5/6 py-3 rounded-lg shadow-lg ">
      <li className="py-4 px-6 flex hover:bg-gray-800 cursor-pointer">
        <div className="w-8 h-8 bg-gray-700 rounded-full mr-4">
          <img
            src={`../..${selectedAIRole.picture}`}
            alt={selectedAIRole.AIName}
          />
        </div>
        <div className="flex-1 w-full text-white">
          <div className="pb-1 border-b-2 text-lg">{selectedAIRole.AIName}</div>

          <div className="pt-1">{chat.title}</div>
        </div>
      </li>
    </div>
  );
};

export default ChatList;
