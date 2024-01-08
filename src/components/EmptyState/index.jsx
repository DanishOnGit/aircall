import React from 'react'
import styles from "./EmptyState.module.css"
const EmptyState = ({text}) => {
  return (
    <h2 className={styles.text}>{text}</h2>
  )
}

export default EmptyState