import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { uiActions } from "../store/ui";

import HomePage from "../pages/Home";
import RootLayout from "../pages/Root";
import LoginPage from "../pages/Login";
import ErrorPage from "../pages/Error";

//React Router DOM
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const uiDispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/auth/login/success`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
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
  }, []);

  // //Checks if the window is resized to mobile size
  // useEffect(() => {
  //   const handleResize = () => {
  //     console.log("I am in Mobile");
  //     uiDispatch(uiActions.updateMobileState(window.innerWidth < 768));
  //   };
  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

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
