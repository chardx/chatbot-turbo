import React from "react";
import { useSelector } from "react-redux";

import SignInBar from "./Login/SignInBar";
import UserDisplay from "./UserDisplay";

const Menu = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="flex flex-col">
      {isLoggedIn && <UserDisplay />}
      <div className="fading-hr m-2"></div>
      <SignInBar />
    </div>
  );
};

export default Menu;
