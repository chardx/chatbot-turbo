import React from "react";
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
  onHandleKeyEnter,
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
  return (
    <div className="flex h-30 w-screen max-w-7xl justify-center items-center mx-2 mt-4">
      <FileUploader
        setHasUserUploadedImage={setHasUserUploadedImage}
        setHasUserUploadedPDF={setHasUserUploadedPDF}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
      <textarea
        className="w-[80%] h-full border text-black ml-2 p-2 rounded-lg"
        placeholder="Enter Text here..."
        ref={inputRef}
        value={userInput}
        rows={3}
        onKeyDown={onHandleKeyEnter}
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
          onHandleKeyEnter(enterKeyEvent);
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
