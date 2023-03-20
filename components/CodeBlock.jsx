import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const CodeBlock = ({ language, value }) => {
  return (
    <div className="bg-gray-500">
      <SyntaxHighlighter
        language="jsx"
        style={atomOneDark}
        wrapLongLines={true}
        customStyle={{
          padding: "25px",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
