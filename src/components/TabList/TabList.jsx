import React from "react";
import Tab from "../Tab/Tab.jsx";
import styles from "./TabList.module.css";
const TabList = ({ tabs = [], onTabSelect, activeTab }) => {
  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <Tab
          onTabSelect={onTabSelect}
          tabName={tab.tabName}
          isActive={tab.tabName === activeTab}
        />
      ))}
    </div>
  );
};

export default TabList;
