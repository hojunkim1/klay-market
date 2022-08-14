import React from "react";
import { SSRProvider } from "react-aria";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SSRProvider>
      <App />
    </SSRProvider>
  </React.StrictMode>
);
