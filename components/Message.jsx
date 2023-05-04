import React, { useEffect, useCallback } from "react";
// import CodeBlock from "./CodeBlock/CodeBlock";
import { useTypewriter } from "react-simple-typewriter";
import { useDispatch } from "react-redux";
import { textToSpeechActions } from "../store/textToSpeech";

import { MemoizedReactMarkdown } from "./Markdown/MemoizedReactMarkdown";

import { CodeBlock } from "./Markdown/Codeblock";
import rehypeMathjax from "rehype-mathjax";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkImages from "remark-images";

const Message = ({ messageContent, activeProfilePic }) => {
  const dispatch = useDispatch();

  if (!messageContent) {
    return null;
  }

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

      {isGPT ? (
        <MemoizedReactMarkdown
          className="prose dark:prose-invert"
          remarkPlugins={[remarkGfm, remarkMath, remarkImages]}
          rehypePlugins={[rehypeMathjax]}
          components={{
            code({ node, inline, className, children, ...props }) {
              console.log(className);
              const match = /language-(\w+)/.exec(className || "");
              console.log("match: " + match);
              return !inline ? (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
            table({ children }) {
              return (
                <table className="border-collapse border border-black px-3 py-1 dark:border-white">
                  {children}
                </table>
              );
            },
            th({ children }) {
              return (
                <th className="break-words border border-black bg-gray-500 px-3 py-1 text-white dark:border-white">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="break-words border border-black px-3 py-1 dark:border-white">
                  {children}
                </td>
              );
            },
          }}
        >
          {/* {displayResponse(messageContent)} */}
          {messageContent.message}
        </MemoizedReactMarkdown>
      ) : (
        messageContent.message
      )}
      {/* {isGPT && <VoiceCommand message={messageContent.message} />} */}
    </div>
  );
};

export default Message;
