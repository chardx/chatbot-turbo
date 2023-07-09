import React from "react";

const LoginPage = () => {
  const googleAuth = async () => {
    // const response = await fetch(
    //   `${process.env.VITE_SERVER_URL}/auth/login/initialize`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const { token } = await response.json();

    // console.log(token);

    // // Redirect the user to the Google login page, including the generated token as a query parameter
    // window.location.href = `${process.env.VITE_SERVER_URL}/auth/google/callback?token=${token}`;
    const authWindow = window.open(
      `${process.env.VITE_SERVER_URL}/auth/google/callback`,
      "_blank"
    );

    const checkTokenInterval = setInterval(() => {
      if (authWindow.closed) {
        clearInterval(checkTokenInterval);

        // Retrieve the token from the URL query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        console.log(token);
        // Save the token to local storage or state
        localStorage.setItem("jwtToken", token);

        // Do any further processing or redirect as needed
        // ...
      }
    }, 1000);
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
