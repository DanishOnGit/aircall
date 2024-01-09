import React, { useEffect, useState } from 'react'
import styles from "./CallDetails.module.css"
import { BASE_API_URL } from '../../utils/constant';
import { formatTimestamp, getAmPm } from '../../utils/utils'
import Spinner from '../Loader/index.jsx';

const CallDetails = ({ onClose, isOpen, selectedCallId }) => {
    const [callDetails, setCallDetails] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const makeFirstLetterCaps = (str) => {
        if (!str) return ""
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    useEffect(() => {
        setIsLoading(true)
        fetch(`${BASE_API_URL}/activities/${selectedCallId}`).then(res => res.json()).then(data => setCallDetails(data)).catch(console.error).finally(()=>setIsLoading(false))
    }, [])

    return (
        <div className={`${styles.modal} ${isOpen ? styles.open : ''}`} onClick={onClose} >
            <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}><b>Call Details</b></div>
                {isLoading ? <Spinner /> : <div className={styles.contentBody}>
                    {
                        callDetails ? <div>
                            <p className={styles.detail}><b>From:</b> {callDetails.from}</p>
                            <p className={styles.detail}><b>To:</b> {callDetails.to}</p>
                            <p className={styles.detail}><b>Via:</b> {callDetails.via}</p>
                            <p className={styles.detail}><b>Duration:</b> {callDetails.duration} secs</p>
                            <p className={styles.detail}><b>Type:</b> {makeFirstLetterCaps(callDetails.call_type)}</p>
                            <p className={styles.detail}><b>Time:</b> {formatTimestamp(callDetails.created_at)} {getAmPm(callDetails.created_at)}</p>
                        </div> : "No details found"
                    }
                </div>}
            </div>
        </div>
    )
}

export default CallDetails