import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AI_Role from "./AI_Role";
import { uiActions } from "../../store/ui";

const AI_List = () => {
  const uiDispatch = useDispatch();
  const [showScrollbar, setShowScrollbar] = useState(false);
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  useEffect(() => {
    const container = document.getElementById("ai-container");
    setShowScrollbar(container.scrollHeight > container.clientHeight);
  }, [listOfAI]);

  const handleCloseRightDrawer = () => {
    uiDispatch(uiActions.updateRightDrawerOpen(false));
  };

  return (
    <div
      id="ai-container"
      className="h-[60%] py-8 text-white glassmorphism 
      scrollbar-thin scrollbar-thumb-green-400"
      style={{
        maxHeight: "600px",
        overflowY: showScrollbar ? "auto" : "initial",
      }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="flex justify-between">
          <h2 className="text-2xl leading-6 font-medium text-white">
            My Agents
          </h2>
          <button onClick={handleCloseRightDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6">
          <ul className="divide-y divide-gray-200 overflow-y-auto">
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
