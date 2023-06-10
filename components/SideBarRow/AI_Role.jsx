import React from "react";
import { aiActions } from "../../store/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { chatHistoryActions } from "../../store/chatHistory";

const AI_Roles = ({ AIName, id, description, content, picture }) => {
  const dispatch = useDispatch();
  const activeAI = useSelector((state) => state.ai.activeAI);

  //Check if the current component is Active AI
  const isActive = activeAI.id === id;

  const handleUpdateActiveAI = (id) => {
    dispatch(aiActions.updateNewSelectedAI(id));

    //Set active ChatID to null
    dispatch(chatHistoryActions.setActiveChatID(null));
  };
  return (
    <li>
      <div
        className={`flex items-center justify-between w-full p-4 bg-zinc-900 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl ${
          isActive ? "border-x-8 border-white" : ""
        }`}
        onClick={() => handleUpdateActiveAI(id)}
      >
        <div className="flex items-center space-x-4">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src={`../..${picture}`}
            alt={AIName}
          />
          <div>
            <h2 className="text-lg font-medium">{AIName}</h2>
            <p className="text-sm font-dark">{description}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </li>
  );
};

export default AI_Roles;
