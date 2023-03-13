import React, { useState, useRef, useEffect } from "react";
import Message from "../components/Message";
import { processMessageToChatGPT } from "../functions/processMessage";

console.log(import.meta.env.API_KEY);
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

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (event) => {
    const newMessage = {
      message: promptInputRef.current.value,
      direction: "outgoing",
      sender: "user",
    };
    console.log(promptInputRef.current.value);

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    console.log(messages);
    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    promptInputRef.current.value = "";

    promptInputRef.current.focus();

    const log = await processMessageToChatGPT(
      newMessages,
      setMessages,
      setIsTyping
    );
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  };

  useEffect(() => {
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
          return <Message model={message} key={i} />;
        })}
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
          className="w-[30%] rounded border-4 text-black"
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default ChatBox;
