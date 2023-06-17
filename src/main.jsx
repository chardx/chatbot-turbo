import React from "react";
import ReactDOM from "react-dom/client";
import "../init";
import App from "./App";
import { Provider } from "react-redux";
import store from "../store";
import "regenerator-runtime";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
