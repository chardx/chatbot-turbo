import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { messagesActions } from "../../store/messages";
import { aiActions } from "../../store/ai";
import {
  IconCheck,
  IconMessage,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import SidebarActionButton from "../Buttons/SidebarActionButton";

const ChatList = ({ chat }) => {
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  const dispatch = useDispatch();
  const selectedAIRole = listOfAI.find((ai) => ai.id === chat.selectedAI);
  const loadConversation = () => {
    dispatch(
      messagesActions.startNewConversation({
        title: chat.title,
        id: chat.id,
        dateCreated: chat.dateCreated,
        selectedAI: chat.selectedAI,
        userID: "chad",
        messages: chat.messages,
      })
    );

    //Update Active AI
    dispatch(aiActions.loadSaveConversation(chat.selectedAI));
  };
  return (
    <div onClick={loadConversation} className="bg-zinc-900 w-full h-auto py-3 ">
      <li className="py-4 px-6 flex hover:bg-gray-800 cursor-pointer">
        <div className="w-8 h-8 bg-gray-700 rounded-full mr-4">
          <img
            src={`../..${selectedAIRole.picture}`}
            alt={selectedAIRole.AIName}
          />
        </div>
        <div className="flex-1 w-full text-white">
          <p className="pt-1 text-xs">{chat.title}</p>
        </div>

        <div className="right-1 z-10 flex text-gray-300">
          <SidebarActionButton>
            <IconPencil size={18} />
          </SidebarActionButton>
          <SidebarActionButton>
            <IconTrash size={18} />
          </SidebarActionButton>
        </div>
      </li>
    </div>
  );
};

export default ChatList;
