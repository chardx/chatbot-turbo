import React from "react";

const Hamburger = ({ onHamburgerClick }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onHamburgerClick}
        className="rounded-md border border-transparent text-white transition-all hover:border-white/20 hover:bg-gradient-to-t hover:from-green-400 hover:to-from-green-700 focus:outline-none"
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
  );
};

export default Hamburger;
