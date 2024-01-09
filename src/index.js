import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React, { StrictMode } from "react";
import "./index.css";
const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
