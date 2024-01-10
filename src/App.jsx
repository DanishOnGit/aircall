import React, { Suspense} from "react";
import Header from "./Header.jsx";
import TabList from "./components/TabList/TabList.jsx";
import { tabList } from "./utils/constant.js";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import "react-simple-toasts/dist/theme/warning.css";
import "react-simple-toasts/dist/theme/failure.css";
import "react-simple-toasts/dist/theme/success.css";
import Spinner from "./components/Loader/Loader.jsx";
import ActivityList from "./ActivityList.jsx";
import {useActivity} from "./contexts/ActivityContext.jsx"

toastConfig({ theme: "dark" });
const App = () => {
  const {activeTab,setActiveTab}= useActivity()

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
