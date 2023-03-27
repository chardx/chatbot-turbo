import React, { useState } from "react";

import { CopyIcon } from "./copyicon";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
const CodeBlock = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyFn = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(!isCopied);
    } catch (error) {
      setIsCopied(!isCopied);
      console.error(`Failed to copy text: ${error}`);
    }
  };

  return (
    <div className="bg-black rounded-md mb-4">
      <div className="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 mt-5 text-xs font-sans justify-between rounded-t-md">
        <div className="flex ml-auto gap-2">
          <CopyIcon />
          <button className="" onClick={() => copyFn(code)}>
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-y-auto">
        <SyntaxHighlighter
          language="javascript"
          style={materialDark}
          wrapLongLines={true}
          customStyle={{
            padding: "10px",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
