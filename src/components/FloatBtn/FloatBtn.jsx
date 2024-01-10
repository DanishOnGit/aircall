import React from "react";
import styles from "./FloatBtn.module.css";
import { Tooltip } from 'react-tooltip';
import { useActivity } from '../../contexts/ActivityContext.jsx';
import { tabs } from '../../utils/constant';
const FloatBtn = ({ text, icon, onClick }) => {
  const {activeTab}=useActivity();
  const tooltip= activeTab===tabs.archive?"Unarchive all":"Archive all"
  return (
    <React.Fragment>
    <button data-tooltip-id="my-tooltip" data-tooltip-content={tooltip} onClick={onClick} className={styles.btn}>
      {text && <span></span>}
      {icon}
    </button>
    <Tooltip id="my-tooltip" />
    </React.Fragment>
  );
};

export default FloatBtn;
