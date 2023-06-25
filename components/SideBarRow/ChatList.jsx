import React, { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { messagesActions } from "../../store/messages";
import { aiActions } from "../../store/ai";
import { chatHistoryActions } from "../../store/chatHistory";
import { uiActions } from "../../store/ui";

import {
  IconCheck,
  IconMessage,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import SidebarActionButton from "../Buttons/SidebarActionButton";

const ChatList = memo(({ chat }) => {
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  const dispatch = useDispatch();
  const uiDispatch = useDispatch();

  const selectedAIRole = listOfAI.find((ai) => ai.id === chat.selectedAI);
  const activeUserID = useSelector((state) => state.auth.userInfo.userID);
  const activeChatID = useSelector((state) => state.chatHistory.activeChatID);

  const isMobile = useSelector((state) => state.ui.isMobile);

  if (!selectedAIRole) return;

  //Check if the current component is Active Chat
  const isActiveChat = activeChatID === chat.id;

  const loadConversation = () => {
    dispatch(
      messagesActions.startNewConversation({
        title: chat.title,
        id: chat.id,
        dateCreated: chat.dateCreated,
        dateLastUpdated: chat.dateLastUpdated,
        selectedAI: chat.selectedAI,
        userID: activeUserID,
        messages: chat.messages,
      })
    );

    //Set active ChatID
    dispatch(chatHistoryActions.setActiveChatID(chat.id));

    //Update Active AI
    dispatch(aiActions.loadSaveConversation(chat.selectedAI));

    //Close Left Drawer on mobile
    if (isMobile) uiDispatch(uiActions.updateLeftDrawerOpen(false));
  };
  return (
    <div
      onClick={loadConversation}
      className={`w-full h-auto py-3 
      ${isActiveChat ? "bg-gray-800" : "bg-zinc-900"} 
      `}
    >
      <li
        className={`py-4 px-6 flex hover:bg-gray-800 cursor-pointer
      `}
      >
        <div className="w-8 h-8 rounded-full mr-4">
          <img src={selectedAIRole.picture} alt={selectedAIRole.AIName} />
        </div>
        <div className="flex-1 w-full text-white">
          <p className="pt-1 text-xs">{chat.title}</p>
        </div>
        {isActiveChat && (
          <div className="right-1 z-10 flex text-gray-300">
            <SidebarActionButton>
              <IconPencil size={18} />
            </SidebarActionButton>
            <SidebarActionButton>
              <IconTrash size={18} />
            </SidebarActionButton>
          </div>
        )}
      </li>
    </div>
  );
});

export default ChatList;
