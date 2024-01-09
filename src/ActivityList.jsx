import React, { useEffect, useState } from 'react'
import { BASE_API_URL, tabs } from './utils/constant'
import FloatBtn from './components/FloatBtn/index.jsx'
import { ArchiveAll, UnArchiveAll } from './icons/icons'
import CallCard from './components/CallCard/CallCard.jsx'
import EmptyState from './components/EmptyState/index.jsx'

const ActivityList = ({activeTab}) => {
    const [activity, setActivity] = useState([])

    const archiveCall = (callId) => {
    const endpoint = `${BASE_API_URL}/activities/${callId}`
    return fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_archived: true
      }),
    })
  }
    const archiveAllCalls = () => {
        let promiseList = []
        filterData(activity).forEach(call => {
          promiseList.push(archiveCall(call.id))
        });
        const res = Promise.allSettled(promiseList).then(res => {
          console.log({res})
          fetchActivity()
        })
          .catch(error => {
            console.error("Failed to archive", error);
          });
      }
    
      const unArchiveAllCalls = () => {
        fetch(`${BASE_API_URL}/reset`,{
          method:"PATCH"
        }).then(_ => fetchActivity()).catch(console.error)
      }
    const filterData = (data) => {
        if (activeTab === tabs.activityFeed) {
          return data.filter(item => !item.is_archived)
        }
        return data.filter(item => item.is_archived)
      }
    
      const fetchActivity = () => {
        setTimeout(() => {
            fetch(`${BASE_API_URL}/activities`).then(res => res.json()).then(data => setActivity(data))
        }, 2000);
      }
    
      useEffect(() => {
        fetchActivity()
      }, [])
    
      const filteredData=filterData(activity)
    //   if(!filteredData.length) return <EmptyState text={"No activity found"}/>
    return (
        <div className='callCardsContainer'>
            {
                filteredData.map(call => <CallCard id={call.id} key={call.id} direction={call.direction} callType={call.call_type} from={call.from} to={call.to} createDate={call.created_at} />)
            }
            <FloatBtn onClick={activeTab === tabs.activityFeed ? archiveAllCalls : unArchiveAllCalls} icon={activeTab === tabs.activityFeed ? <ArchiveAll /> : <UnArchiveAll />} />
        </div>
    )
}

export default ActivityList