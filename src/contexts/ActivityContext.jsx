import React, { createContext, useContext, useState } from "react";
import { tabs } from "../utils/constant";

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState(tabs.activityFeed);
  const [activity, setActivity] = useState([]);
  return (
    <ActivityContext.Provider
      value={{ activeTab, setActiveTab,activity,setActivity }}
    >
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity=()=> useContext(ActivityContext)
