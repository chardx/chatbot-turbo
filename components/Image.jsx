import React from "react";

const Image = ({ url }) => {
  return (
    <div className="flex justify-center items-center rounded-lg p-4 px-5">
      <img src={url} alt={url} className="rounded-lg shadow-md" />
    </div>
  );
};

export default Image;
