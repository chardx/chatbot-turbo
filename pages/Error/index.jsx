import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";
  console.log("The error is: " + error.data.message);
  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.staus === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <h2> {title}</h2>
      <p>{message} </p>
    </>
  );
};
export default ErrorPage;
