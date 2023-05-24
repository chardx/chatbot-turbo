import React, { useState } from "react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";

const ImageUploader = ({
  setHasUserUploadedImage,
  setUploadedImage,
  uploadedImage,
}) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="flex flex-row">
      <Dropzone
        accept="image/png, image/jpg"
        acceptedFiles=".jpg,.jpeg,.png,.pdf"
        multiple={false}
        noClick={true}
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length === 0) return;

          if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.type === "application/pdf") {
              alert("PDF files uploaded");
            } else if (
              file.type === "image/jpeg" ||
              file.type === "image/png"
            ) {
              console.log("User attached an image");
              setHasUserUploadedImage(true);
            }
            setPreview(URL.createObjectURL(acceptedFiles[0]));
            setUploadedImage(acceptedFiles[0]);
          }
        }}
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

export default ImageUploader;
