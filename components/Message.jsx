import React, { useEffect, useCallback } from "react";
import UnknownUser from "./UI/Svg/UnknownUser";

// import CodeBlock from "./CodeBlock/CodeBlock";
import { useDispatch, useSelector } from "react-redux";

import { MemoizedReactMarkdown } from "./Markdown/MemoizedReactMarkdown";

import { CodeBlock } from "./Markdown/Codeblock";
import rehypeMathjax from "rehype-mathjax";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkImages from "remark-images";

const Message = ({ messageContent, activeProfilePic }) => {
  const dispatch = useDispatch();
  const userPhotoUrl = useSelector((state) => state.auth.userInfo.photoUrl);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (!messageContent) {
    return null;
  }

  const aiLayout = "bg-[#40414f]";
  const userLayout = "bg-[#343541]";

  let isGPT = messageContent.sender === "ChatGPT";
  const layout = isGPT ? aiLayout : userLayout;

  return (
    <div
      className={`w-full ${layout} px-2 sm:px-5 py-5 flex flex-row justify-start`}
    >
      {/* <div className="flex-0 hidden w-[10%] md:w-[15%] lg:block"></div> */}

      <div className="flex-0 w-10 h-10 sm:ml-5 pr-2 sm:w-20 sm:h-20 sm:pr-6">
        {isGPT && (
          <img
            src={`${activeProfilePic}`}
            className="object-cover rounded-full mr-2"
          />
        )}
        {!isGPT && isLoggedIn && (
          <img
            src={`${userPhotoUrl}`}
            className="object-cover rounded-full mr-2"
          />
        )}
        {!isGPT && !isLoggedIn && <UnknownUser />}
      </div>
      <div className="flex flex-1 items-center prose prose-invert lg:prose-lg xl:prose-xl px-1">
        {isGPT ? (
          <MemoizedReactMarkdown
            className="prose prose-invert lg:prose-lg xl:prose-xl w-full"
            remarkPlugins={[remarkGfm, remarkMath, remarkImages]}
            rehypePlugins={[rehypeMathjax]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
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
    </div>
  );
};

export default Message;
