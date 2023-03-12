import React from "react";
import Message from "../components/Message";
const ChatBox = () => {
  return (
    <div
      className="container text-sm mx-auto w-[90%] h-[85%]
    max-w-4xl"
    >
      <div
        className="flex flex-col w-full h-full px-2 
    border-4 border-dashed overflow-y-auto"
      >
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>
      <div className="flex flex-row justify-center">
        <textarea
          className="flex-1 w-auto border"
          placeholder="Enter Text here..."
        ></textarea>

        <button className="w-[30%] rounded border-4">Submit</button>
      </div>
    </div>
  );
};

export default ChatBox;
