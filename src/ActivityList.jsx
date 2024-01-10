import React, { useEffect, useState } from "react";
import { BASE_API_URL, tabs } from "./utils/constant";
import FloatBtn from "./components/FloatBtn/FloatBtn.jsx";
import { ArchiveAll, UnArchiveAll } from "./icons/icons";
import CallCard from "./components/CallCard/CallCard.jsx";
import EmptyState from "./components/EmptyState/EmptyState.jsx";
import Spinner from "./components/Loader/Loader.jsx";
import { motion } from "framer-motion";
import toast from "react-simple-toasts";
import { useActivity } from "./contexts/ActivityContext.jsx";


const ActivityList = ({ activeTab }) => {
  const { activity, setActivity } = useActivity();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);

  const archiveCall = (callId) => {
    const endpoint = `${BASE_API_URL}/activities/${callId}`;
    return fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: true,
      }),
    });
  };
  const archiveAllCalls = () => {
    let promiseList = [];
    filterData(activity).forEach((call) => {
      promiseList.push(archiveCall(call.id));
    });
    setIsLoading(true);
    Promise.allSettled(promiseList)
      .then((res) => {
        let callFail = res.find((item) => {
          if (item.status === "rejected" || (item.value && item.value.ok) === false)
            return item;
        });
        if (callFail)
          return toast("Some calls could not be archived", {
            theme: "warning",
          });
      })
      .catch((error) => {
        toast("Please try again", { theme: "failure" });
      })
      .finally(() => {
        setIsLoading(false);
        fetchActivity();
      });
  };

  const unArchiveAllCalls = () => {
    setIsLoading(true);
    fetch(`${BASE_API_URL}/reset`, {
      method: "PATCH",
    })
      .then((_) => fetchActivity())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const filterData = (data) => {
    if (activeTab === tabs.activityFeed) {
      return data.filter((item) => !item.is_archived);
    }
    return data.filter((item) => item.is_archived);
  };

  const fetchActivity = () => {
    setIsLoadingActivity(true);
    fetch(`${BASE_API_URL}/activities`)
      .then((res) => res.json())
      .then((data) => setActivity(data))
      .catch(console.error)
      .finally(() => {
        setIsLoadingActivity(false);
      });
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const filteredData = filterData(activity);
  const archivedCalls = activity.filter((call) => call.is_archived);
  const unArchivedCalls = activity.filter((call) => !call.is_archived);
  const containerVariants = {
    visible: { transition: { staggerChildren: 0.1 } },
  };

  if (isLoading || isLoadingActivity) return <Spinner />;

  if (!archivedCalls.length && activeTab === tabs.archive)
    return <EmptyState text={"No calls here"} />;

  if (!unArchivedCalls.length && activeTab === tabs.activityFeed)
    return <EmptyState text={"No calls here"} />;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="callCardsContainer"
    >
      {filteredData.map((call) => (
        <CallCard
          id={call.id}
          key={call.id}
          direction={call.direction}
          callType={call.call_type}
          from={call.from}
          to={call.to}
          createDate={call.created_at}
        />
      ))}
      <FloatBtn
        onClick={
          activeTab === tabs.activityFeed ? archiveAllCalls : unArchiveAllCalls
        }
        icon={
          activeTab === tabs.activityFeed ? <ArchiveAll /> : <UnArchiveAll />
        }
      />
    </motion.div>
  );
};

export default ActivityList;
