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
          <form onSubmit={handleSubmit}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Add New Quiz</strong>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol md={6}>
                    <div className="mb-3">
                      <label>Title</label>
                      <input
                        disabled={isLoading}
                        className="form-control"
                        type="text"
                        name="qTitle"
                        value={state.qTitle}
                        onChange={changeHandler}
                        required
                        placeholder="Quiz title"
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-3">
                      <label>From Date</label>
                      <input
                        disabled={isLoading}
                        className="form-control"
                        type="date"
                        name="qFromDate"
                        value={state.qFromDate}
                        onChange={changeHandler}
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-3">
                      <label>To Date (Deadline For doing this quiz)</label>
                      <input
                        disabled={isLoading}
                        className="form-control"
                        type="date"
                        name="qToDate"
                        value={state.qToDate}
                        onChange={changeHandler}
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-3">
                      <label>Start Time</label>
                      <input
                        disabled={isLoading}
                        className="form-control"
                        type="time"
                        name="qFromTime"
                        value={state.qFromTime}
                        onChange={changeHandler}
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-3">
                      <label>End Time</label>
                      <input
                        disabled={isLoading}
                        className="form-control"
                        type="time"
                        name="qToTime"
                        value={state.qToTime}
                        onChange={changeHandler}
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-3">
                      <label>Total Marks</label>
                      <input
                        disabled={isLoading}
                        className="form-control"
                        type="number"
                        name="qTotalMarks"
                        value={state.qTotalMarks}
                        onChange={changeHandler}
                        placeholder="Enter total Marks"
                        required
                      />
                    </div>
                  </CCol>
                  <CCol md={6}>
                    <div className="mb-3">
                      <label>Users Limit</label>
                      <input
                        disabled={isLoading}
                        className="form-control"
                        type="number"
                        name="qUserLimit"
                        value={state.qUserLimit}
                        onChange={changeHandler}
                        placeholder="Enter maximum number of users to attempt this quiz"
                        required
                      />
                    </div>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardFooter>
                <div className="text-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                  >
                    {isLoading && <CSpinner size="sm" />} Save Quiz
                  </button>
                </div>
              </CCardFooter>
            </CCard>
          </form>
        </CCol>
      </CRow>
    </>
  );
};

export default Quizes;
