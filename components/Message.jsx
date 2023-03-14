import React from "react";
import { Typewriter } from "react-simple-typewriter";
const Message = ({ model, onType }) => {
  const aiLayout = "bg-[#40414f] px-5 py-5";
  const userLayout = "bg-[#343541] px-5 py-5 text-right";
  const layout = model.sender === "ChatGPT" ? aiLayout : userLayout;

  return (
    <>
      <p className={layout}>
        {model.sender === "ChatGPT" ? (
          <Typewriter words={[model.message]} loop={1} typeSpeed={10} />
        ) : (
          model.message
        )}
      </p>
    </>
  );
};

export default Message;
