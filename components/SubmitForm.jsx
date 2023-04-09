import React from "react";
import VoiceCommand from "./VoiceCommand";
const SubmitForm = ({ inputRef, onHandleSend, onHandleKeyEnter }) => {
  return (
    <div className="flex flex-row justify-center">
      <textarea
        className="flex-1 w-auto border text-black"
        placeholder="Enter Text here..."
        ref={inputRef}
        onKeyDown={onHandleKeyEnter}
      ></textarea>
      <VoiceCommand className="w-2" />
      <button
        onClick={onHandleSend}
        id="btnSubmit"
        className="w-[30%] px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitForm;
