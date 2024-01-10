import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import React, { StrictMode } from "react";
import "./index.css";
import { ActivityProvider } from "./contexts/ActivityContext.jsx";
const root = createRoot(document.getElementById("app"));
root.render(
  <StrictMode>
    <ActivityProvider>
      <App />
    </ActivityProvider>
  </StrictMode>
);
