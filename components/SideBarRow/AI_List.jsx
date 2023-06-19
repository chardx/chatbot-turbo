import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AI_Role from "./AI_Role";

const AI_List = () => {
  const [showScrollbar, setShowScrollbar] = useState(false);
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  useEffect(() => {
    const container = document.getElementById("ai-container");
    setShowScrollbar(container.scrollHeight > container.clientHeight);
  }, [listOfAI]);

  return (
    <div
      id="ai-container"
      className="absolute py-8 text-white glassmorphism scrollbar-thin scrollbar-thumb-green-400"
      style={{
        maxHeight: "600px",
        overflowY: showScrollbar ? "auto" : "initial",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl leading-6 font-medium text-white">My Agents</h2>
        <div className="mt-6">
          <ul className="divide-y divide-gray-200">
            {listOfAI.map((role) => {
              return (
                <AI_Role
                  key={role.id}
                  id={role.id}
                  AIName={role.AIName}
                  description={role.description}
                  content={role.content}
                  picture={role.picture}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AI_List;
