import React from "react";
import Message from "../components/Message";
const ChatBox = () => {
  return (
    <section
      className="container text-sm mx-auto w-[90%] h-[80%]
    max-w-4xl"
    >
      <div
        className="flex flex-col w-full h-full px-2 
    border-4 border-solid overflow-y-auto bg-black"
      >
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
    </section>
  );
};

export default ChatBox;
