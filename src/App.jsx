import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import CallCard from './components/CallCard/CallCard.jsx';
import TabList from './components/TabList/index.jsx';
import FloatBtn from './components/FloatBtn/index.jsx';
import { ArchiveAll, UnArchiveAll } from './icons/icons.js';
import { BASE_API_URL, tabList, tabs } from './utils/constant.js';
import EmptyState from './components/EmptyState/index.jsx';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import 'react-simple-toasts/dist/theme/warning.css';

toastConfig({theme:"dark"})
const App = () => {
  const [activity, setActivity] = useState([])
  const [activeTab, setActiveTab] = useState(tabs.activityFeed)

  const onTabSelect = (tabName) => {
    if (!tabName) throw Error('Please select valid tab name')
    setActiveTab(tabName)
  }

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
    fetch(`${BASE_API_URL}/activities`).then(res => res.json()).then(data => setActivity(data))
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  const filteredData=filterData(activity)

  return (
    <div className='container'>
      <Header />
      <div className="container-view">
        <TabList tabs={tabList} onTabSelect={onTabSelect} activeTab={activeTab} />
        {filteredData && filteredData.length ?
          <div className='callCardsContainer'>
            {
              filteredData.map(call => <CallCard key={call.id} direction={call.direction} callType={call.call_type} from={call.from} to={call.to} createDate={call.created_at} />)
            }
          </div>
          :
            <EmptyState text={"No activity found"}/>
        }
        {
          filteredData.length ? <FloatBtn onClick={activeTab === tabs.activityFeed ? archiveAllCalls : unArchiveAllCalls} icon={activeTab === tabs.activityFeed ? <ArchiveAll /> : <UnArchiveAll />} />:null
        }
      </div>
    </div>
  );
};


export default App;
