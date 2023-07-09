import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";

import HomePage from "../pages/Home";
import RootLayout from "../pages/Root";
import LoginPage from "../pages/Login";
import ErrorPage from "../pages/Error";

//React Router DOM
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setCounter((prev) => prev + 1);
    console.log(`App rendered: ${counter} time/s`);

    let jwtToken;

    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.size);
    if (urlParams.size > 0) {
      jwtToken = urlParams.get("token");

      localStorage.setItem("token", jwtToken);
    } else {
      console.log(jwtToken);
      jwtToken = localStorage.getItem("token");
    }
    const urlWithoutToken = window.location.href.split("?")[0]; // Extract the current URL without the token parameter
    const newUrl = `${urlWithoutToken}`; // URL with updated token parameter

    window.history.replaceState({}, document.title, newUrl);
    console.log("Token");
    console.log(jwtToken);

    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/auth/login/success`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Data");

          console.log(data.user);
          const userID = data.user.userID;
          const userDisplayName = data.user.user;
          const userPhotoUrl = data.user.picture;
          setUser(data.user);
          //Update value of Login to True
          dispatch(
            authActions.updateLoginStatus({
              loginStatus: true,
              userInfo: {
                userID,
                displayName: userDisplayName,
                photoUrl: userPhotoUrl,
              },
            })
          );
        } else {
          dispatch(
            authActions.updateLoginStatus({
              loginStatus: false,
              userInfo: {
                userID: "",
                displayName: "",
                photoUrl: "",
              },
            })
          );
          throw new Error("Authentication has failed!");
        }
      } catch (err) {
        dispatch(
          authActions.updateLoginStatus({
            loginStatus: false,
            userInfo: {
              userID: "",
              displayName: "",
              photoUrl: "",
            },
          })
        );
        console.log(err);
      }
    };

    getUser();
    console.log("logging in...");
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", index: true, element: <HomePage /> },

        { path: "/login", element: <LoginPage /> },
        { path: "/store", element: <p>Store</p> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <script
        async
        src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/OpusMediaRecorder.umd.js"
      ></script>
      <script
        async
        src="https://cdn.jsdelivr.net/npm/opus-media-recorder@latest/encoderWorker.umd.js"
      ></script>
    </>
  );
}

export default App;
