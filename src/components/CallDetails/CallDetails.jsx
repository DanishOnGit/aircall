import React, { useEffect, useState } from "react";
import styles from "./CallDetails.module.css";
import { BASE_API_URL, tabs } from "../../utils/constant.js";
import { formatTimestamp, getAmPm } from "../../utils/utils.js";
import Spinner from "../Loader/Loader.jsx";
import { motion,AnimatePresence } from "framer-motion";
import { Close } from "../../icons/icons.js";
import { useActivity } from "../../contexts/ActivityContext.jsx";
import toast from "react-simple-toasts";

const CallDetails = ({ onClose, isOpen, selectedCallId }) => {
  const [callDetails, setCallDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { activeTab,setActivity } = useActivity();

  const motionObj={
    initial:{ opacity: 0, scale: 0 },
    animate:{ opacity: 1, scale: 1 },
    transition:{
      duration: 0.5,
      ease: [0, 0.71, 0.2, 1.01],
    }
  }

  const fetchActivity = () => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/activities`)
      .then((res) => res.json())
      .then((data) => setActivity(data))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const archiveOrUnarchiveCall = (callId,archive) => {
    setIsLoading(true);
    const endpoint = `${BASE_API_URL}/activities/${callId}`;
    return fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived:archive,
      }),
    })
      .then((res) =>{
        if(res.ok){
          if(archive===true){
            toast("Call archived", { theme: "success" });
          }
          if(archive===false){
            toast("Call Unarchived", { theme: "success" });
          }
          fetchActivity();
          setTimeout(()=>onClose(),1000)
        }else{
          if(archive===true){
            toast("Unable to archive call", { theme: "failure" });
          }
          if(archive===false){
            toast("Could not Unarchive call", { theme: "failure" });
          }
        }
      })
      .catch((error) => {
        console.error(error);
        toast("Please try again", { theme: "failure" });
      })
      .finally(() => setIsLoading(false));
  };

  const makeFirstLetterCaps = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/activities/${selectedCallId}`)
      .then((res) => res.json())
      .then((data) => setCallDetails(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AnimatePresence>
    <div
      className={`${styles.modal} ${isOpen ? styles.open : ""}`}
      onClick={onClose}
    >
      
      <motion.div
        initial={motionObj.initial}
        animate={motionObj.animate}
        transition={motionObj.transition}
        className={styles["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <b>Call Details</b>
          <Close onClick={onClose} />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className={styles.contentBody}>
            {callDetails ? (
              <div>
                <p className={styles.detail}>
                  <b>From:</b> {callDetails.from}
                </p>
                <p className={styles.detail}>
                  <b>To:</b> {callDetails.to}
                </p>
                <p className={styles.detail}>
                  <b>Via:</b> {callDetails.via}
                </p>
                <p className={styles.detail}>
                  <b>Duration:</b> {callDetails.duration} secs
                </p>
                <p className={styles.detail}>
                  <b>Type:</b> {makeFirstLetterCaps(callDetails.call_type)}
                </p>
                <p className={styles.detail}>
                  <b>Time:</b> {formatTimestamp(callDetails.created_at)}{" "}
                  {getAmPm(callDetails.created_at)}
                </p>
              </div>
            ) : (
              "No details found"
            )}
          </div>
        )}
        {!isLoading && (
          <div className={styles.footer}>
            <button
              className={styles.btn}
              onClick={() =>{
                activeTab===tabs.archive?archiveOrUnarchiveCall(selectedCallId,false):
                 archiveOrUnarchiveCall(selectedCallId,true)
                }}
            >
              {activeTab===tabs.archive?"Unarchive call":"Archive call"}
            </button>
          </div>
        )}
      </motion.div>
    </div>
      </AnimatePresence>
  );
};

export default CallDetails;
