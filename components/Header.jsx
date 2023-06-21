import React from "react";

const Header = ({ onLeftHamburgerClick, onRightHamburgerClick }) => {
  return (
    <header className="h-[8%] sm:h-[10%] bg-teal-700 text-white py-4 gradient-background gradient-animation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onLeftHamburgerClick}
            className="mr-4 text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div>
          <h1 className="text-lg md:font-medium md:text-2xl">ChadGPT Turbo</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={onRightHamburgerClick}
            className="mr-4 text-white hover:text-gray-200 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
