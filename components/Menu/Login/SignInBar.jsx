import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const SignInBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const handleNavigate = () => {
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/auth/google/callback`,
      "_self"
    );
  };

  const handleSignout = async () => {
    localStorage.removeItem("token");
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/logout`, "_self");
  };
  return (
    <div className="flex flex-row ">
      {!isLoggedIn ? (
        <button
          type="button"
          className="w-full group flex cursor-pointer flex-row items-center rounded-md p-2 hover:bg-white/5"
          onClick={handleNavigate}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path>
          </svg>
          <span className="text-md ml-4 text-center">Sign in</span>
        </button>
      ) : (
        <button
          type="button"
          className="w-full group flex cursor-pointer flex-row items-center rounded-md p-2 hover:bg-white/5"
          onClick={handleSignout}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path>
          </svg>
          <span className="text-md ml-4 text-center">Sign out</span>
        </button>
      )}
    </div>
  );
};

export default SignInBar;
