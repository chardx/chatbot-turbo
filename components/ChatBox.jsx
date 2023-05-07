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
import { v4 as uuidv4 } from "uuid";
import { processStableDiffusion } from "../functions/processStableDiffusion";
import { generateChatTitle } from "../functions/generateChatTitle";

import { streamResponseActions } from "../store/stream";
//Custom Hook
import { useChatGPT } from "../hooks/useChatGPT";

const ChatBox = () => {
  //Selectors
  const activeAI = useSelector((state) => state.ai.activeAI);
  const newAISelected = useSelector((state) => state.ai.newAISelected);

  const dispatch = useDispatch();

  const messages = useSelector((state) => state.messages.messages);
  const conversation = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(false);

  //Custom Hook
  const [response, startChatStream] = useChatGPT();

  const streamStatus = useSelector((state) => state.stream.status);
  //Refs
  const promptInputRef = useRef();
  const chatRef = useRef(null);

  //updates the initial Message whenever new AI is selected
  useEffect(() => {
    // setNewMessages([...messages]);
    let tempNewMessages = [...messages];
    const updatedMessage = {
      ...tempNewMessages[0],
      message: activeAI.initialMessage,
    };

    // Keep only the first message with the updated message value
    // setNewMessages([updatedMessage]);
    tempNewMessages = [updatedMessage];
    console.log("ako");
    console.log(tempNewMessages);
    dispatch(
      messagesActions.startNewConversation({
        title: `Conversation with ${activeAI.AIName}`,
        id: uuidv4(),
        dateCreated: new Date().toLocaleString(),
        selectedAI: activeAI.id,
        userID: "chad",
        messages: tempNewMessages,
      })
    );
  }, [newAISelected]);

  const handleSend = async (event) => {
    const newMessage = {
      message: promptInputRef.current.value,
      direction: "outgoing",
      sender: "user",
      isImage: false,
    };

    const tempNewMessages = [...messages, newMessage];

    dispatch(messagesActions.updateMessage(tempNewMessages));

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setLoading(true);
    promptInputRef.current.value = "";
    promptInputRef.current.focus();

    let chatGPTResponse;

    if (newMessage.message.includes("image")) {
      //Code for DALLE
      // chatGPTResponse = await processImage(newMessage.message);
      //Code for StableDiffusion
      chatGPTResponse = await processStableDiffusion(newMessage.message);
    } else if (newMessage.message.includes("google")) {
      chatGPTResponse = await processGoogleSearch(newMessage.message);
    } else {
      // chatGPTResponse = await processMessageToChatGPT(newMessages, activeAI);

      //Add add new message temporarily to start streaming
      const dummyUpdatedMessages = [
        ...tempNewMessages,
        { message: "", sender: "ChatGPT" },
      ];
      dispatch(messagesActions.updateMessage(dummyUpdatedMessages));

      chatGPTResponse = await startChatStream(tempNewMessages, activeAI);
    }

    //Add GPTResponse to Messages
    const updatedMessages = [...tempNewMessages, chatGPTResponse];
    console.log("New message:" + updatedMessages);
    dispatch(messagesActions.updateMessage(updatedMessages));

    //Stopped Loading
    setLoading(false);

    //Generate Title
    const generateTitle = async () => {
      // this function only run once within first 3 messages
      if (updatedMessages.length > 3) return conversation.title;

      const title = await generateChatTitle(updatedMessages);
      dispatch(messagesActions.updateTitle(title.text));

      return title.text;
    };
    //Save to FireStore

    if (import.meta.env.VITE_FIREBASE !== "disabled") {
      await onSaveConversation({
        title: await generateTitle(),
        id: conversation.id.toString(),
        dateCreated: conversation.dateCreated,
        selectedAI: activeAI.id,
        userID: conversation.userID,
        messages: updatedMessages,
      });
    }
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter" && promptInputRef.current.value) {
      handleSend();
    }
  };

  //Update Messages when stream is getting updates
  //not best solution - will find alternative way
  useEffect(() => {
    if (streamStatus === "idle") return;
    dispatch(messagesActions.updateMessageStream(response));
  }, [response]);

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
                  activeProfilePic={activeAI.picture}
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
