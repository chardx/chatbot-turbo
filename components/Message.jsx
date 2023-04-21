import React, { useEffect, useCallback } from "react";
import CodeBlock from "./CodeBlock/CodeBlock";
import { useTypewriter } from "react-simple-typewriter";
import { useDispatch } from "react-redux";
import { textToSpeechActions } from "../store/textToSpeech";

const Message = ({ messageContent, activeProfilePic }) => {
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
    <div className={`${layout} flex flex-row`}>
      {isGPT ? (
        <img
          src={`..${activeProfilePic}`}
          className="w-20 h-20 rounded-full mr-2"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-20 h-20 rounded-full mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      )}
      <span className="text-lg">
        {isGPT ? displayResponse(messageContent) : messageContent.message}
      </span>
      {/* {isGPT && <VoiceCommand message={messageContent.message} />} */}
    </div>
  );
};

export default Message;
