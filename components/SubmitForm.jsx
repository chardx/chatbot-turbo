import React from "react";
import VoiceCommand from "./VoiceCommand";
import SpeakCommand from "./SpeakCommand";
import FileUploader from "./FileUploader";
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
  const handleChange = (e) => {
    const value = e.target.vaue;
    setUserInput(value);
  };
  return (
    <div className="flex h-30 justify-center mx-2 mt-4">
      <FileUploader
        setHasUserUploadedImage={setHasUserUploadedImage}
        setHasUserUploadedPDF={setHasUserUploadedPDF}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
      <textarea
        className="w-[80%] border text-black ml-2 p-2 rounded-lg"
        placeholder="Enter Text here..."
        ref={inputRef}
        value={userInput}
        rows={2}
        onKeyDown={onHandleKeyEnter}
        onChange={handleChange}
      />
      <div className="flex flex-col justify-center gap-2 px-2 sm:flex-row sm:gap-0">
        <VoiceCommand />
        <SpeakCommand promptInputRef={inputRef} handleSend={onHandleSend} />
      </div>
      <button
        onClick={onHandleSend}
        id="btnSubmit"
        className="rounded-md md:bottom-3 md:p-2 
        md:right-3 dark:hover:bg-gray-900 
        dark:disabled:hover:bg-transparent right-2 disabled:text-gray-400 enabled:bg-brand-purple text-white bottom-1.5 transition-colors 
        disabled:opacity-40 bg-[#4ADE80]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="none"
          className="h-4 w-4 m-1 md:m-0 sm:h-10 sm:w-10"
          strokeWidth="2"
        >
          <path
            d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default SubmitForm;
