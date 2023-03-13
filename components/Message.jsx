import React from "react";

const Message = ({ model }) => {
  const aiLayout = "bg-[#40414f] px-5 py-5";
  const userLayout = "bg-[#343541] px-5 py-5 text-right";
  const layout = model.sender === "ChatGPT" ? aiLayout : userLayout;

  return (
    <>
      <p className={layout}>{model.message}</p>
    </>
  );
};

export default Message;
