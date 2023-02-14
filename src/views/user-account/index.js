import { cilPen, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CCol, CContainer, CRow } from "@coreui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { APP_COLORS } from "src/constants/colors";
import "../../scss/userAccount.scss";
import Header from "../header";
import Quizes from "./quizes";
import Settings from "./settings";
import Wallet from "./wallet";

const activeTabEnum = {
  QUIZ_ATTEMPT: "quiz_attempt",
  WALLET: "wallet",
  SETTINGS: "settings",
};
function UserAccount() {
  const { names, phone, email } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState(activeTabEnum.QUIZ_ATTEMPT);
  return (
    <div className="userprofileMainContainer">
      <Header />
      <div className="banner">&nbsp;</div>
      <div className="main-contents">
        <CContainer>
          <CRow>
            <CCol md={7}>
              <div className="contents-container">
                <ul className="account-tabs">
                  <li
                    className={
                      activeTab === activeTabEnum.QUIZ_ATTEMPT ? "active" : ""
                    }
                    onClick={() => setActiveTab(activeTabEnum.QUIZ_ATTEMPT)}
                  >
                    Quiz Attempts
                  </li>
                  <li
                    className={
                      activeTab === activeTabEnum.WALLET ? "active" : ""
                    }
                    onClick={() => setActiveTab(activeTabEnum.WALLET)}
                  >
                    My Wallet
                  </li>
                  <li
                    className={
                      activeTab === activeTabEnum.SETTINGS ? "active" : ""
                    }
                    onClick={() => setActiveTab(activeTabEnum.SETTINGS)}
                  >
                    Account Settings
                  </li>
                </ul>
                <div className="tab-contents">
                  {activeTab === activeTabEnum.QUIZ_ATTEMPT && <Quizes />}
                  {activeTab === activeTabEnum.WALLET && <Wallet />}
                  {activeTab === activeTabEnum.SETTINGS && <Settings />}
                </div>
              </div>
            </CCol>
            <CCol md={5}>
              <div className="contents-container">
                <div className="profile-section">
                  <div className="no-image">
                    <CIcon
                      icon={cilUser}
                      size="5xl"
                      style={{ color: APP_COLORS.WHITE }}
                    />
                  </div>
                </div>
                <div className="profile-contents">
                  <h3>{names}</h3>
                  <p className="m-0">{email}</p>
                  <p className="m-0">{phone}</p>
                  <p
                    className="m-0"
                    style={{
                      color: "blue",
                      fontStyle: "italic",
                      cursor: "pointer",
                    }}
                  >
                    <CIcon icon={cilPen} /> <small>Update Image</small>
                  </p>
                </div>
              </div>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
}

export default UserAccount;
