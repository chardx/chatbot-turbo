import React from "react";

const AI_Roles = ({
  AIName,
  id,
  activeAI,
  description,
  content,
  onHandleClick,
}) => {
  const isActive = activeAI === id;

  return (
    <li>
      <div
        className={`flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-lg transition duration-500 ease-in-out transform hover:scale-105 hover:shadow-xl ${
          isActive ? "border-l-4 border-green-500" : ""
        }`}
        onClick={() => onHandleClick(id)}
      >
        <div className="flex items-center space-x-4">
          <img
            className="w-16 h-16 object-cover rounded-full"
            src={`https://source.unsplash.com/200x200/?${AIName}`}
            alt={AIName}
          />
          <div>
            <h2 className="text-lg font-medium">{AIName}</h2>
            <p className="text-sm font-light text-gray-600">{description}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </li>
  );
};

export default AI_Roles;
