import React, { useEffect } from "react";
import { useTypewriter } from "react-simple-typewriter";
import CodeBlock from "./CodeBlock";

const Message = ({ model, scrollToBottom, isTyping }) => {
  const [text, { isDone }] = useTypewriter({
    words: [model.message],
    loop: 1,
    typeSpeed: 5,
  });

  const aiLayout = "bg-[#40414f] px-5 py-5";
  const userLayout = "bg-[#343541] px-5 py-5 text-right";
  const layout = model.sender === "ChatGPT" ? aiLayout : userLayout;

  useEffect(() => {
    if (isDone) {
      scrollToBottom();
    }
  }, [isDone]);

  // regular expression to check if message contains code
  const codeRegex = /(```\s([\s\S]*?)\s```)/;

  // split message into code and text sections
  const sections = model.message.split(codeRegex);

  const messageEvaluation = sections.map((section, index) => {
    // check if section is code
    if (section.match(/```\s([\s\S]*?)\s```/)) {
      // extract language and code from backticks
      const [_, language, value] = section.match(/```(.*)\n([\s\S]*?)```/);

      return <CodeBlock key={index} language={language} value={value} />;
    } else {
      return <p key={index}>{section}</p>;
    }
  });

  return (
    <div className={layout}>
      {model.sender === "ChatGPT" && !isTyping
        ? messageEvaluation
        : // text
          model.message}
    </div>
  );
};

export default Message;
