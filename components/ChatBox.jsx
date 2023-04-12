import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import Image from "../components/Image";
import ChatLoad from "./ChatLoad";
import SubmitForm from "./SubmitForm";
import { useSelector } from "react-redux";
import { processMessageToChatGPT } from "../utils/processMessage";
import { processImage } from "../utils/processImage";
import { processGoogleSearch } from "../utils/googleSearch";

const ChatBox = () => {
  //Selectors
  const activeAI = useSelector((state) => state.ai.activeAI);
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  const initialMessage = useSelector((state) => state.ai.initialMessage);

  //State
  const [messages, setMessages] = useState([
    {
      message: initialMessage,
      sentTime: "just now",
      sender: "ChatGPT",
      isImage: false,
      image: "",
      alt: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  //Refs
  const promptInputRef = useRef();
  const chatRef = useRef(null);

  //updates the initial Message whenever new AI is selected
  useEffect(() => {
    const newMessages = [...messages];
    newMessages[0].message = initialMessage;
    setMessages(newMessages);
  }, [initialMessage]);

  let imageUrl = null;

  const handleSend = async (event) => {
    const newMessage = {
      message: promptInputRef.current.value,
      direction: "outgoing",
      sender: "user",
      isImage: false,
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);

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
    setMessages([...newMessages, chatGPTResponse]);
    setLoading(false);
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
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
        {messages.length}
        {messages &&
          messages.map((message, i) => {
            return (
              <React.Fragment key={i}>
                <Message messageContent={message} />
                {message.isImage && (
                  <p>Richard</p>
                  // <Image url={message.image} alt={message.alt} />
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
