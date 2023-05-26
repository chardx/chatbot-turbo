import React, { useState } from "react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";
import { processUploadFile } from "../functions/processUploadFile";

const FileUploader = ({
  setHasUserUploadedPDF,
  setHasUserUploadedImage,
  setUploadedImage,
  uploadedImage,
}) => {
  const [preview, setPreview] = useState("");
  const [docsAttachment, setDocsAttachment] = useState("");

  const handleOnDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    console.log(file.type);
    if (
      file.type === "application/pdf" ||
      file.type === "text/plain" ||
      file.type === "text/csv" ||
      file.type === "application/json"
    ) {
      console.log("User attached a Document file");

      alert(`Files uploaded: " ${file.name} - ${file.type}/${file.size}}`);
      setHasUserUploadedPDF(true);
      handleUploadDocuments(file);
    } else if (file.type === "image/jpeg" || file.type === "image/png") {
      console.log("User attached an image");
      setPreview(URL.createObjectURL(file));
      setUploadedImage(file);
      setHasUserUploadedImage(true);
    } else {
      alert("Invalid file type");
      return;
    }
  };

  const handleUploadDocuments = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    console.log(file);
    const response = await processUploadFile(formData);
    console.log(response);
  };
  return (
    <div className="flex flex-row">
      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png,.pdf,.csv,.xls,.xlsx,.txt"
        multiple={false}
        noClick={true}
        onDrop={handleOnDrop}
      >
        {({ getRootProps, getInputProps, open }) => (
          <div {...getRootProps()}>
            <input {...getInputProps({ accept: ".jpg,.jpeg,.png,.pdf" })} />
            <PaperClipIcon className="h-12 w-12 text-blue-500" onClick={open} />
          </div>
        )}
      </Dropzone>

      {uploadedImage && (
        <div className="flex flex-row mx-0">
          <XMarkIcon
            className="w-4 h-4 text-white relative left-4 border-2 border-white rounded-full"
            onClick={() => {
              setUploadedImage("");
              setAttachment("");
              setHasUserUploadedImage(false);
            }}
          />
          <img
            alt="message-form-preview"
            className="w-20 h-12 pr-2"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
        </div>
      )}

      {/* <button onClick={handleUpload}>Upload</button> */}
    </div>
  );
};

export default FileUploader;
