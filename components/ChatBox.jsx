import React from "react";
import Message from "../components/Message";
const ChatBox = () => {
  const DUMMY_CONVO = [
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
    {
      message: "What is Javascript",
      sentTime: "just now",
      sender: "user",
    },
    {
      message:
        "JavaScript is a high-level, dynamic, and interpreted programming language that is commonly used for creating interactive and dynamic web pages. It is a client-side language, meaning that it runs on the user's web browser rather than on a web server.",
      sentTime: "juest now",
      sender: "ChatGPT",
    },
  ];
  const handleSubmit = () => {
    console.log("Hello");
  };
  return (
    <section
      className="container text-sm mx-auto w-[90%] h-[80%]
    max-w-4xl"
    >
      <div
        className="flex flex-col w-full h-full 
    border-4 border-solid overflow-y-auto bg-[#343541]"
      >
        {DUMMY_CONVO.map((message, i) => {
          return <Message item={message} key={i} />;
        })}
      </div>
      <div className="flex flex-row justify-center">
        <textarea
          className="flex-1 w-auto border text-black"
          placeholder="Enter Text here..."
          htmlFor="btn-submit"
        ></textarea>

        <button
          onClick={handleSubmit}
          id="btn-submit"
          className="w-[30%] rounded border-4 text-black"
        >
          Submit
        </button>
      </div>
    </section>
  );
};

export default ChatBox;
