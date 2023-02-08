import { CContainer } from "@coreui/react";
import React from "react";

function Tabs({ activeTab, setActiveTab }) {
  return (
    <CContainer>
      <div className="tabsContainer">
        <ul>
          <li
            className={activeTab == "timeLine" ? "active" : ""}
            onClick={() => setActiveTab("timeLine")}
          >
            Timeline
          </li>
          <li
            className={activeTab == "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About
          </li>
          <li
            className={activeTab == "photos" ? "active" : ""}
            onClick={() => setActiveTab("photos")}
          >
            Photos
          </li>
        </ul>
      </div>
    </CContainer>
  );
}

export default Tabs;
