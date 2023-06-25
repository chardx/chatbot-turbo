import React, { useEffect, useRef } from "react";
import autosize from "autosize";

import VoiceCommand from "./VoiceCommand";
import SpeakCommand from "./SpeakCommand";
import FileUploader from "./FileUploader";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";
import SubmitButton from "./UI/Svg/SubmitButton";
const SubmitForm = ({
  inputRef,
  userInput,
  setUserInput,
  onHandleSend,

  setHasUserUploadedImage,
  setHasUserUploadedPDF,
  setUploadedImage,
  uploadedImage,
}) => {
  const uiDispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.vaue;
    setUserInput(value);
  };

  const handleFocus = () => {
    uiDispatch(uiActions.closeAllDrawers());
  };

  const handleKeyDown = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const handleKeyEnter = (event) => {
    console.log(event.key);
    if (event.key === "Enter" && inputRef.current.value.trim() === "") return;

    if (event.key === "Enter" && inputRef.current.value && !event.shiftKey) {
      console.log("Enter key pressed");

      event.preventDefault();
      inputRef.current.focus();
      setUserInput("");
      onHandleSend();

      // Clear Values
      // promptInputRef.current.value = "";
    }
  };

  useEffect(() => {
    autosize(inputRef.current);
  }, [userInput]);

  return (
    <div className="fixed bottom-2 md:bottom-5 flex h-30 w-full max-w-7xl justify-center items-center mx-2 mt-6">
      <FileUploader
        setHasUserUploadedImage={setHasUserUploadedImage}
        setHasUserUploadedPDF={setHasUserUploadedPDF}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
      <textarea
        className="w-[80%] h-full border  bg-transparent
         text-white ml-2 p-2 rounded-lg focus:outline-none scrollbar-thin scrollbar-thumb-green-400"
        style={{ maxHeight: "200px", overflowY: "hidden" }}
        placeholder="Enter Text here..."
        ref={inputRef}
        value={userInput}
        rows={1}
        onKeyDown={handleKeyEnter}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <div className="flex flex-col justify-center gap-2 px-2 sm:flex-row sm:gap-0">
        <VoiceCommand />
        <SpeakCommand promptInputRef={inputRef} handleSend={onHandleSend} />
      </div>
      <button
        onClick={() => {
          const enterKeyEvent = new KeyboardEvent("keydown", { key: "Enter" });
          handleKeyEnter(enterKeyEvent);
        }}
        id="btnSubmit"
        className="rounded-md md:bottom-3 md:p-2 
        md:right-3 dark:hover:bg-gray-900 
        dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors 
        disabled:opacity-40 bg-[#4ADE80]"
      >
        <SubmitButton />
      </button>
    </div>
  );
};

export default SubmitForm;
