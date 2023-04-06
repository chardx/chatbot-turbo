import React, { useState, useEffect } from "react";
import AI_Role from "./AI_Role";

const AI_List = ({ listOfAI }) => {
  return (
    <div className="bg-gray-100 py-8 text-black glassmorphism">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl leading-6 font-medium text-gray-900">
          List of AI
        </h2>
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
