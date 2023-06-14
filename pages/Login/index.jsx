import React from "react";

const LoginPage = () => {
  const googleAuth = () => {
    window.open(`${process.env.VITE_SERVER_URL}/auth/google/callback`, "_self");
  };
  return (
    <div className="bg-zinc-900 w-full h-full text-white">
      <button
        className="text-gray/50 relative rounded-lg border-2 border-white/30 px-4 py-1 font-bold transition-all sm:px-10 sm:py-3"
        onClick={googleAuth}
      >
        <img src="./images/google.png" alt="google icon" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default LoginPage;
