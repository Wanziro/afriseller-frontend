import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CSpinner,
  CTooltip,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilDelete } from "@coreui/icons";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler, toastMessage } from "src/helpers";
import axios from "axios";

const initialState = {
  companyId: "",
  qTitle: "",
  qFromDate: "",
  qToDate: "",
  qFromTime: "",
  qToTime: "",
  qTotalMarks: "",
  qUserLimit: "",
};
const Quizes = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const { token } = useSelector((state) => state.user);
  const { company } = useSelector((state) => state.myCompany);
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(BACKEND_URL + "/quizes/", {
        ...state,
        companyId: company.companyId,
        token,
      })
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", res.data.msg);
          setState(initialState), setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoading(false);
        }, 1000);
      });
  };

  return (
    <>
      <CRow>
        <CCol xs={12} md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Stystem users</strong>
            </CCardHeader>
            <CCardBody>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Names</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Has a company</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Quizes;
