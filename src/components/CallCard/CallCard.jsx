import React, { useState } from 'react'
import styles from './CallCard.module.css'
import { IncomingCall, Information, MissedCall, OutgoingCall, Voicemail } from '../../icons/icons'
import { formatTimestamp, getAmPm } from '../../utils/utils'
import CallDetails from '../CallDetails/index.jsx'
import { createPortal } from 'react-dom'

const CallCard = ({ direction = 'inbound', callType = 'answered', from, to, createDate,id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCallId, setSelectedCallId] = useState(null);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCallId(null)
  };

  const getCallDetails=()=>{
    openModal()
    setSelectedCallId(id);
  }

  const getCallIcon = (direction, callType) => {
    if (!direction || !callType) throw new Error("Call direction and/or call type needed")
    if (direction === 'outbound') return <OutgoingCall />
    if (direction === 'inbound' && callType === 'answered') return <IncomingCall />
    if (direction === 'inbound' && callType === 'missed') return <MissedCall />
    if (direction === 'inbound' && callType === 'voicemail') return <Voicemail />
  }


  return (
    <div className={styles.cardContainer}>
      <div>
        {getCallIcon(direction, callType)}
      </div>
      <div className={styles.callDetailsContainer}>
        <div className={styles.callDetails}>
          <p className={styles.callFrom}>{from}</p>
          <p className={styles.callTo}>tried to call on {to}</p>
        </div>
        <Information onClick={getCallDetails}/>
      </div>
      <div className={styles.callTime}>
        {formatTimestamp(createDate)}
        <span className={styles.amPm}>
          {getAmPm(createDate)}
        </span>
      </div>
      {isModalOpen && createPortal(<CallDetails selectedCallId={selectedCallId} isOpen={isModalOpen} onClose={closeModal}/>,document.getElementById("root")) }
    </div>
  )
}

export default CallCard