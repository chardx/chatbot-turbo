import React, { useState } from "react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Dropzone from "react-dropzone";

const ImageUploader = ({
  setIsUserUploadedImage,
  setUploadedImage,
  uploadedImage,
}) => {
  const [preview, setPreview] = useState("");

  return (
    <div className="flex flex-row">
      <Dropzone
        acceptedFiles=".jpg,.jpeg,.png"
        multiple={false}
        noClick={true}
        onDrop={(acceptedFiles) => {
          setPreview(URL.createObjectURL(acceptedFiles[0]));
          setUploadedImage(acceptedFiles[0]);
          setIsUserUploadedImage(true);
        }}
      >
        {({ getRootProps, getInputProps, open }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
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
              setIsUserUploadedImage(false);
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
