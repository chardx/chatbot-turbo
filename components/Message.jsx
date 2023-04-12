import React, { useEffect, useCallback } from "react";
import CodeBlock from "./CodeBlock/CodeBlock";
import { useTypewriter } from "react-simple-typewriter";
import { useDispatch } from "react-redux";
import { textToSpeechActions } from "../store/textToSpeech";

const Message = ({ messageContent }) => {
  const dispatch = useDispatch();

  if (!messageContent) {
    return null;
  }

  console.log("Richard: " + messageContent);
  const aiLayout = "bg-[#40414f] px-5 py-5";
  const userLayout = "bg-[#343541] px-5 py-5 text-right";

  let isGPT = messageContent.sender === "ChatGPT";
  const layout = isGPT ? aiLayout : userLayout;

  const displayResponse = useCallback(
    (chat) => {
      if (chat.message.includes("```") && chat.sender === "ChatGPT") {
        console.log("original: " + chat.message);
        const gptResponse = chat.message.split(/```([\s\S]*)```/);
        console.log("gptResponse: " + gptResponse);
        for (let i = 1; i < gptResponse.length; i += 2) {
          gptResponse[i] = <CodeBlock key={i} code={gptResponse[i]} />;
          console.log("GPT response: " + gptResponse[i]);
          console.log(gptResponse);
          return gptResponse;
        }
      }

      dispatch(textToSpeechActions.updateText(chat.message));
      return chat.message;
    },
    [messageContent.message]
  );

  return (
    <div className={layout}>
      {isGPT ? displayResponse(messageContent) : messageContent.message}
      {/* {isGPT && <VoiceCommand message={messageContent.message} />} */}
    </div>
  );
};

export default Message;
