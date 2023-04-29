import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import Image from "../components/Image";
import ChatLoad from "./ChatLoad";
import SubmitForm from "./SubmitForm";
import { useDispatch, useSelector } from "react-redux";
import { messagesActions } from "../store/messages";
import { processMessageToChatGPT } from "../functions/processMessage";
import { processImage } from "../functions/processImage";
import { processGoogleSearch } from "../functions/googleSearch";
import { onSaveConversation } from "../services/firebaseService";
const ChatBox = () => {
  //Selectors
  const activeAI = useSelector((state) => state.ai.activeAI);
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  const initialMessage = useSelector((state) => state.ai.initialMessage);
  const profilePic = useSelector((state) => state.ai.profilePic);
  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.messages);

  const [loading, setLoading] = useState(false);

  //Refs
  const promptInputRef = useRef();
  const chatRef = useRef(null);

  //updates the initial Message whenever new AI is selected
  useEffect(() => {
    let newMessages = [...messages];
    console.log(newMessages[0]);
    const updatedMessage = {
      ...newMessages[0],
      message: initialMessage,
    };

    // Keep only the first message with the updated message value
    newMessages = [updatedMessage];

    dispatch(messagesActions.updateMessage(newMessages));
  }, [initialMessage]);

  const handleSend = async (event) => {
    const newMessage = {
      message: promptInputRef.current.value,
      direction: "outgoing",
      sender: "user",
      isImage: false,
    };

    const newMessages = [...messages, newMessage];
    // setMessages(newMessages);
    dispatch(messagesActions.updateMessage(newMessages));

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setLoading(true);
    promptInputRef.current.value = "";
    promptInputRef.current.focus();

    let chatGPTResponse;
    if (newMessage.message.includes("image")) {
      chatGPTResponse = await processImage(newMessage.message);
    } else if (newMessage.message.includes("google")) {
      chatGPTResponse = await processGoogleSearch(newMessage.message);
    } else {
      chatGPTResponse = await processMessageToChatGPT(
        newMessages,
        activeAI,
        listOfAI
      );
    }

    //Add GPTResponse to Messages
    const updatedMessages = [...newMessages, chatGPTResponse];
    console.log("New message:" + updatedMessages);
    dispatch(messagesActions.updateMessage(updatedMessages));

    //Save to FireStore

    const result = await onSaveConversation(updatedMessages);
    console.log(result);
    setLoading(false);
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter" && promptInputRef.current.value) {
      handleSend();
    }
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <section
      className="container text-sm mx-auto w-[90%] h-[80%]
    max-w-4xl"
    >
      <div
        className="flex flex-col w-full h-full 
    border-4 border-solid overflow-y-auto bg-[#343541]"
        ref={chatRef}
      >
        {messages &&
          messages.map((message, i) => {
            return (
              <React.Fragment key={i}>
                <Message
                  messageContent={message}
                  activeProfilePic={profilePic}
                />

                {message && message.isImage && (
                  <Image url={message.image} alt={message.alt} />
                )}
              </React.Fragment>
            );
          })}

        <div>{loading && <ChatLoad />}</div>
      </div>
      <SubmitForm
        inputRef={promptInputRef}
        onHandleSend={handleSend}
        onHandleKeyEnter={handleKeyEnter}
      />
    </section>
  );
};

export default ChatBox;
