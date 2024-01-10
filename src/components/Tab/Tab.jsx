import React from "react";
import styles from "./Tab.module.css";
import { useActivity } from '../../contexts/ActivityContext.jsx';
import { tabs } from '../../utils/constant';
const Tab = ({ tabName, isActive, onTabSelect }) => {
  const {activity}=useActivity();

  const filterData = (data) => {
   if(tabName===tabs.activityFeed) return data.filter((item) => !item.is_archived)
   return data.filter((item) => item.is_archived)
  };

  return (
    <div
      onClick={() => onTabSelect(tabName)}
      className={`${styles.tab} ${isActive ? styles.isActive : ""}`}
    >
      {tabName}
      {` (${filterData(activity).length})`}
    </div>
  );
};

export default Tab;
