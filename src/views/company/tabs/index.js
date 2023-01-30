import { CContainer } from "@coreui/react";
import React from "react";

function Tabs() {
  return (
    <CContainer>
      <div className="tabsContainer">
        <ul>
          <li>Timeline</li>
          <li>About</li>
          <li>Photos</li>
        </ul>
      </div>
    </CContainer>
  );
}

export default Tabs;
