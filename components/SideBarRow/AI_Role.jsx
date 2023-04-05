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
        className={`flex flex-col ${
          isActive ? "bg-teal-800" : "bg-gray-100"
        } px-2 text-center md:flex-row glassmorphism rounded-xl border p-4 gap-8 }`}
        onClick={() => onHandleClick(id)}
      >
        <div className="flex-1">
          <img
            className="rounded-full min-w-[5rem] h-auto md:max-w-[10rem]"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ROiPOuUzHKv17Uu39_7hQ0D1TcefIVFqlQ&usqp=CAU"
            alt="AI"
          />
        </div>
        <div className="text-xs">
          <p>{AIName}</p>
        </div>
      </div>
    </li>
  );
};

export default AI_Roles;
