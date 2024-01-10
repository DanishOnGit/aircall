import React, { createContext, useContext, useState } from "react";
import { tabs } from "../utils/constant";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(tabs.activityFeed);
  const [totalCalls, setTotalCalls] = useState(0);
  return (
    <ActivityContext.Provider
      value={{ activeTab, setActiveTab, totalCalls, setTotalCalls }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity=()=> useContext(ActivityContext)
