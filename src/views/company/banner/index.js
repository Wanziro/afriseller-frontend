import {
  cibFacebook,
  cibFacebookF,
  cibInstagram,
  cibTwitter,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { CContainer } from "@coreui/react";
import React from "react";

function Banner({ company }) {
  return (
    <div
      className="bannerContainer"
      style={{ backgroundImage: `url(${require("../../../assets/bg1.jpg")})` }}
    >
      <div className="banner-contents">
        <CContainer>
          <div className="company-profile-container">
            <div className="profile-contents">
              <div>
                <img src={require("../../../assets/bg1.jpg")} alt="" />
              </div>
              <div className="cmp-profile">
                <h1>{company.cmpFullName}</h1>
                <span>{company.cmpBiograph}</span>
                <div className="social-medias-container">
                  <div className="circle">
                    <CIcon icon={cibFacebookF} />
                  </div>
                  <div className="circle">
                    <CIcon icon={cibInstagram} />
                  </div>
                  <div className="circle">
                    <CIcon icon={cibTwitter} />
                  </div>
                </div>
              </div>
            </div>
            <div className="statistics">
              <p>
                Services: <span>2</span>
              </p>
              <p>
                Past Quizes: <span>2</span>
              </p>
            </div>
          </div>
        </CContainer>
      </div>
    </div>
  );
}

export default Banner;
