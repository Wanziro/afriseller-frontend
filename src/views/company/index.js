import React, { useState } from "react";
import Header from "../header";
import Banner from "./banner";
import "../../scss/company.scss";
import Tabs from "./tabs";
import { CCol, CContainer, CRow } from "@coreui/react";
import Contents from "./contents";
import RightSide from "./right-side";

function Company() {
  const [activeTab, setActiveTab] = useState("timeLine");
  return (
    <div className="cmpMainContainer">
      <Header />
      <Banner />
      <Tabs />
      <div>
        <CContainer style={{ marginTop: "1rem" }}>
          <CRow>
            <CCol md={8}>
              <Contents />
            </CCol>
            <CCol md={4}>
              <RightSide />
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
}

export default Company;
