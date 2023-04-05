import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import Image from "../components/Image";
import { processMessageToChatGPT } from "../utils/processMessage";
import { processImage } from "../utils/processImage";
import ChatLoad from "./ChatLoad";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const promptInputRef = useRef();
  const chatRef = useRef(null);
  let imageUrl = null;

  const [loading, setLoading] = useState(false);

  const handleSend = async (event) => {
    const newMessage = {
      message: promptInputRef.current.value,
      direction: "outgoing",
      sender: "user",
    };
    console.log(promptInputRef.current.value);

    //Check if New Message contains a command to create image

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    console.log(messages);
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setLoading(true);
    promptInputRef.current.value = "";

    promptInputRef.current.focus();

    console.log(newMessage.message.includes("image"));
    if (newMessage.message.includes("image")) {
      console.log("image command detected");
      imageUrl = await processImage(
        newMessage.message,
        newMessages,
        setMessages,
        setLoading
      );
    } else {
      const log = await processMessageToChatGPT(
        newMessages,
        setMessages,
        setLoading
      );
    }
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    console.log("scrollToBottom called");
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
    console.log("useEffect called");
    scrollToBottom();
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
        {messages.map((message, i) => {
          return (
            <>
              <Message
                key={i}
                model={message}
                messages={messages}
                scrollToBottom={scrollToBottom}
              />
              {message.isImage && (
                <Image url={message.image} alt={message.alt} />
              )}
            </>
          );
        })}

        <div>{loading && <ChatLoad />}</div>
      </div>
      <div className="flex flex-row justify-center">
        <textarea
          className="flex-1 w-auto border text-black"
          placeholder="Enter Text here..."
          ref={promptInputRef}
          onKeyDown={handleKeyEnter}
        ></textarea>

        <button
          onClick={handleSend}
          id="btnSubmit"
          className="w-[30%] px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400"
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default ChatBox;
