import React from 'react'
import styles from "./FloatBtn.module.css"
const FloatBtn = ({text,icon,onClick}) => {
  return (
    <button onClick={onClick} className={styles.btn}>
        {text && <span></span>}
        {icon}
    </button>
  )
}

export default FloatBtn