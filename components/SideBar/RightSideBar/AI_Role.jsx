import React from "react";
import { aiActions } from "../../../store/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { chatHistoryActions } from "../../../store/chatHistory";
import ArrowRight from "../../UI/Svg/ArrowRight";
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
        className={`flex items-center  w-full p-4 bg-zinc-900 rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl ${
          isActive ? "border-x-8 border-white" : ""
        }`}
        onClick={() => handleUpdateActiveAI(id)}
      >
        <div className="flex md:flex-col lg:flex-row items-center space-x-4">
          <img
            className="w-10 h-10 sm:w-16 sm:h-16 md:w-8 md:h-8 xl:w-14 xl:h-14 object-cover rounded-full"
            src={picture}
            alt={AIName}
          />
          <div>
            <h2 className="text-lg md:text-sm font-medium">{AIName}</h2>
            <p className="text-sm md:text-xs font-dark">{description}</p>
          </div>
        </div>
        <ArrowRight />
      </div>
    </li>
  );
};

export default AI_Roles;
