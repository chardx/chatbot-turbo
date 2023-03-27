import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  materialDark,
  materialLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
const CodeBlock = ({ code }) => {
  return (
    <div className="bg-gray-500">
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
  );
};

export default CodeBlock;
