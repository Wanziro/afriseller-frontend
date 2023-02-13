import React, { useEffect, useState } from "react";
import Header from "../header";
import Banner from "./banner";
import "../../scss/company.scss";
import Tabs from "./tabs";
import { CCol, CContainer, CRow } from "@coreui/react";
import Contents from "./contents";
import RightSide from "./right-side";
import { useDispatch, useSelector } from "react-redux";
import { fetchActiveCompanies } from "src/actions/activeCompanies";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler } from "src/helpers";

function Company() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const activeCompanies = useSelector((state) => state.activeCompanies);
  const [activeTab, setActiveTab] = useState("timeLine");
  const [services, setServices] = useState([]);
  const [isLoadingContents, setIsLoadingContents] = useState(false);

  useEffect(() => {
    dispatch(fetchActiveCompanies());
  }, []);

  useEffect(() => {
    const cmp = activeCompanies.companies.find((item) => item.companyId == id);
    if (cmp) {
      setSelectedCompany(cmp);
    } else {
      setSelectedCompany(null);
    }
  }, [activeCompanies.companies, id]);

  const fetchServices = () => {
    setIsLoadingContents(true);
    axios
      .get(BACKEND_URL + "/companyservices/" + id)
      .then((res) => {
        setTimeout(() => {
          setIsLoadingContents(false);
          setServices(res.data.services);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoadingContents(false);
        }, 1000);
      });
  };
  useEffect(() => {
    if (selectedCompany !== null) {
      fetchServices();
    }
  }, [selectedCompany]);

  return (
    <div className="cmpMainContainer">
      <Header />
      {selectedCompany !== null && <Banner company={selectedCompany} />}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div>
        <CContainer style={{ marginTop: "1rem" }}>
          <CRow>
            <CCol md={8}>
              <Contents
                activeTab={activeTab}
                isLoadingContents={isLoadingContents}
                services={services}
              />
            </CCol>
            <CCol md={4}>
              <RightSide company={selectedCompany} />
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </div>
  );
}

export default Company;
