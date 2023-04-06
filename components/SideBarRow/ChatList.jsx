import React from "react";

const ChatList = () => {
  return (
    <div className="bg-gray-900 w-3/4 h-5/6 rounded-lg shadow-lg overflow-y-scroll">
      <ul className="divide-y divide-gray-700">
        <li className="py-4 px-6 flex">
          <div className="w-8 h-8 bg-gray-700 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="w-2/3 bg-gray-700 h-4 mb-2"></div>
            <div className="w-1/3 bg-gray-700 h-3"></div>
          </div>
        </li>
        <li className="py-4 px-6 flex">
          <div className="w-8 h-8 bg-gray-700 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="w-3/4 bg-gray-700 h-4 mb-2"></div>
            <div className="w-1/4 bg-gray-700 h-3"></div>
          </div>
        </li>
        <li className="py-4 px-6 flex">
          <div className="w-8 h-8 bg-gray-700 rounded-full mr-4"></div>
          <div className="flex-1">
            <div className="w-1/3 bg-gray-700 h-4 mb-2"></div>
            <div className="w-2/3 bg-gray-700 h-3"></div>
          </div>
        </li>
        {/* more chat items */}
      </ul>
    </div>
  );
};

export default ChatList;
