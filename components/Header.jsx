import React from "react";
import Hamburger from "./Buttons/Hamburger";

const Header = ({ onLeftHamburgerClick, onRightHamburgerClick }) => {
  return (
    <header className="h-[8%] sm:h-[10%] bg-teal-700 text-white py-4 gradient-background gradient-animation">
      <div className="w-auto px-4 sm:px-6 lg:px-8 flex  justify-between">
        <Hamburger onHamburgerClick={onLeftHamburgerClick} />
        <div>
          <h1 className="text-lg md:font-medium md:text-2xl">ChadGPT Turbo</h1>
        </div>
        <Hamburger onHamburgerClick={onRightHamburgerClick} />
      </div>
    </header>
  );
};

export default Header;
