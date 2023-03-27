import React, { useEffect, useCallback } from "react";
import CodeBlock from "./CodeBlock/CodeBlock";
import { useTypewriter } from "react-simple-typewriter";
import { shallowEqual } from "shallow-equal";

const displayResponse = (chat) => {
  if (chat.message.includes("```") && chat.sender === "ChatGPT") {
    const gptResponse = chat.message.split(/```([\s\S]*)```/);
    for (let i = 1; i < gptResponse.length; i += 2) {
      gptResponse[i] = <CodeBlock key={i} code={gptResponse[i]} />;
      return gptResponse;
    }
  }
  return chat.message;
};

const Message = ({ model }) => {
  const aiLayout = "bg-[#40414f] px-5 py-5";
  const userLayout = "bg-[#343541] px-5 py-5 text-right";
  const layout = model.sender === "ChatGPT" ? aiLayout : userLayout;

  // const [text, { isDone }] = useTypewriter({
  //   words: displayResponse(model),
  //   loop: 1,
  //   typeSpeed: 5,
  // });

  // // useEffect(() => {
  // //   if (isDone) {
  // //     // displayTextArray();
  // //     scrollToBottom();
  // //   }
  // // }, [isDone]);

  return <div className={layout}>{displayResponse(model)}</div>;
};

export default Message;
