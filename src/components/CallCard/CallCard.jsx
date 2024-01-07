import React from 'react'
import styles from './CallCard.module.css'
import { IncomingCall, MissedCall, OutgoingCall, Voicemail } from '../../icons/icons'
import { formatTimestamp, getAmPm } from '../../utils/utils'

const CallCard = ({ direction = 'inbound',callType='answered',from,to,createDate }) => {

  const getCallIcon=(direction,callType)=>{
    if(!direction || !callType) throw new Error("Call direction and/or call type needed")
    if(direction==='outbound') return <OutgoingCall/>
    if(direction==='inbound' && callType==='answered') return <IncomingCall/>
    if(direction==='inbound' && callType==='missed') return <MissedCall/>
    if(direction==='inbound' && callType==='voicemail') return <Voicemail/>
  }
  return (
    <div className={styles.cardContainer}>
      <div>
        {getCallIcon(direction,callType)}
      </div>
      <div className={styles.callDetails}>
        <p className={styles.callFrom}>{from}</p>
        <p className={styles.callTo}>tried to call on {to}</p>
      </div>
      <div className={styles.callTime}>
        {formatTimestamp(createDate)}
        <span className={styles.amPm}>
        {getAmPm(createDate)}
        </span>
      </div>
    </div>
  )
}

export default CallCard