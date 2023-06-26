import React, { useState, useEffect, useRef } from "react";
import CloseButton from "../../UI/Svg/CloseButton";
import { useSelector, useDispatch } from "react-redux";
import AI_Role from "./AI_Role";
import { uiActions } from "../../../store/ui";

const AI_List = () => {
  const uiDispatch = useDispatch();
  const divRef = useRef(null);

  const [showScrollbar, setShowScrollbar] = useState(false);
  const listOfAI = useSelector((state) => state.ai.aiRoles);
  useEffect(() => {
    const container = document.getElementById("ai-container");
    setShowScrollbar(container.scrollHeight > container.clientHeight);
  }, [listOfAI]);

  useEffect(() => {
    const handleClick = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        console.log("Triggered outside click");
      }

      document.addEventListener("mousedown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
      };
    };
  }, []);

  const handleCloseRightDrawer = () => {
    uiDispatch(uiActions.updateRightDrawerOpen(false));
  };

  return (
    <div
      ref={divRef}
      id="ai-container"
      className="overflow-y-scroll h-[90vh] max-h-[600px] py-8 text-white glassmorphism 
      scrollbar-thin scrollbar-thumb-green-400"
    >
      <div className="px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="flex justify-between">
          <h2 className="text-2xl leading-6 font-medium text-white">
            My Agents
          </h2>
          <button onClick={handleCloseRightDrawer}>
            <CloseButton />
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
