import React from "react";
import VoiceCommand from "./VoiceCommand";
import SpeakCommand from "./SpeakCommand";
import FileUploader from "./FileUploader";
const SubmitForm = ({
  inputRef,
  onHandleSend,
  onHandleKeyEnter,
  setHasUserUploadedImage,
  setHasUserUploadedPDF,
  setUploadedImage,
  uploadedImage,
}) => {
  return (
    <div className="flex flex-row  justify-center mx-2 mt-4">
      <FileUploader
        setHasUserUploadedImage={setHasUserUploadedImage}
        setHasUserUploadedPDF={setHasUserUploadedPDF}
        setUploadedImage={setUploadedImage}
        uploadedImage={uploadedImage}
      />
      <textarea
        className="flex-1 w-auto border text-black ml-2 p-2 rounded-lg"
        placeholder="Enter Text here..."
        ref={inputRef}
        onKeyDown={onHandleKeyEnter}
      ></textarea>
      <VoiceCommand className="w-2" />
      <SpeakCommand
        className="w-2"
        promptInputRef={inputRef}
        handleSend={onHandleSend}
      />

      <button
        onClick={onHandleSend}
        id="btnSubmit"
        className="w-[240px] text-xl px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-teal-400"
      >
        Submit
      </button>
    </div>
  );
};

export default SubmitForm;
