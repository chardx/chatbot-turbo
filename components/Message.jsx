import React, { useRef, useState, useEffect } from "react";
import { Typewriter, useTypewriter } from "react-simple-typewriter";

const isDone = () => {};

const Message = ({ model, scrollToBottom, isTyping }) => {
  const [text, { isDone }] = useTypewriter({
    words: [model.message],
    loop: 1,
    typeSpeed: 5,
  });

  const aiLayout = "bg-[#40414f] px-5 py-5";
  const userLayout = "bg-[#343541] px-5 py-5 text-right";
  const layout = model.sender === "ChatGPT" ? aiLayout : userLayout;

  const messageText = isTyping ? "..." : text;
  useEffect(() => {
    if (isDone) {
      console.log("Is done");
      scrollToBottom();
    }
  }, [isDone]);

  return (
    <div>
      <p className={layout}>
        {model.sender === "ChatGPT" && !isTyping
          ? messageText
          : // text
            model.message}
      </p>
    </div>
  );
};

export default Message;
