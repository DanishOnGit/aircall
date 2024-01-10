import React from "react";
import styles from "./Tab.module.css";
const Tab = ({ tabName, isActive, onTabSelect }) => {
  return (
    <div
      onClick={() => onTabSelect(tabName)}
      className={`${styles.tab} ${isActive ? styles.isActive : ""}`}
    >
      {tabName}
    </div>
  );
};

export default Tab;
