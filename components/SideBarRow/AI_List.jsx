import React, { useState, useEffect } from "react";
import AI_Role from "./AI_Role";

const AI_List = () => {
  const [activeAI, setActiveAI] = useState("r1");

  const handleAiSelect = (id) => {
    setActiveAI(id);
  };

  useEffect(() => {
    console.log(activeAI);
  }, [activeAI]);
  const DUMMY_ROLES = [
    {
      id: "r1",
      AIName: "Rodolpo - tropa mong malupet",
      description: "Tanong ka pre kahit ano!",
      content:
        "Act like you're a Filipino and only speaks in Tagalog but informal or with kanto words. Your name is Rodolfo and you're a Filipino.",
    },
    {
      id: "r2",
      AIName: "Javris - Javascript expert",
      description: "You can ask anything about the Software Development",
      content:
        "Act like you're a professional Web Developer and only speaks in English with 20 years of experience. Your name is Javris and you're a Javascript expert.",
    },
    {
      id: "r3",
      AIName: "Hermione - Your English Tutor",
      description: "You can ask anything about the Software Development",
      content:
        "Please act as a Friendly English Tutor and grammar expert and correct any grammar and spelling errors in my writing. On response a corrected version and revised in the best way possible. Your name is Hermione and you're a English Tutor.",
    },
  ];

  return (
    <div className="bg-gray-100 py-8 text-black glassmorphism">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl leading-6 font-medium text-gray-900">
          List of AI
        </h2>
        <div className="mt-6">
          <ul className="divide-y divide-gray-200">
            {DUMMY_ROLES.map((role) => {
              return (
                <AI_Role
                  key={role.id}
                  id={role.id}
                  AIName={role.AIName}
                  description={role.description}
                  content={role.content}
                  onHandleClick={() => handleAiSelect(role.id)}
                  activeAI={activeAI}
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
