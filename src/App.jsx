import React, { Suspense, useEffect, useState } from "react";
import Header from "./Header.jsx";
import CallCard from "./components/CallCard/CallCard.jsx";
import TabList from "./components/TabList/index.jsx";
import FloatBtn from "./components/FloatBtn/index.jsx";
import { ArchiveAll, UnArchiveAll } from "./icons/icons.js";
import { BASE_API_URL, tabList, tabs } from "./utils/constant.js";
import EmptyState from "./components/EmptyState/index.jsx";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/warning.css";
import Spinner from "./components/Loader/index.jsx";
import ActivityList from "./ActivityList.jsx";

toastConfig({ theme: "dark" });
const App = () => {
  const [activeTab, setActiveTab] = useState(tabs.activityFeed);

  const onTabSelect = (tabName) => {
    if (!tabName) throw Error("Please select valid tab name");
    setActiveTab(tabName);
  };

  return (
    <div id="root" className="container">
      <Header />
      <div className="container-view">
        <TabList
          tabs={tabList}
          onTabSelect={onTabSelect}
          activeTab={activeTab}
        />
        <Suspense fallback={<Spinner />}>
          <ActivityList activeTab={activeTab} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
