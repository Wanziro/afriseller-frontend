import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler, toastMessage } from "src/helpers";

const initialState = {
  qId: "",
  companyId: "",
  qTitle: "",
  qFromDate: "",
  qToDate: " ",
  qFromTime: "",
  qToTime: "",
  qTotalMarks: "",
  qIsActive: "",
  qUserLimit: "",
};
function Edit({ showModal, setShowModal, editItem, fetchData }) {
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/quizes/", { ...state, token })
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", res.data.msg);
          setSubmitting(false);
          setShowModal(false);
          fetchData();
        }, 1000);
      })

      .catch((error) => {
        setSubmitting(false);
        errorHandler(error);
      });
  };

  useEffect(() => {
    if (showModal) {
      editItem && setState(editItem);
    }
  }, [showModal]);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <CModalHeader>
            <CModalTitle>Edit Quiz</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="mb-3">
              <label>Title</label>
              <input
                disabled={submitting}
                className="form-control"
                type="text"
                name="qTitle"
                value={state.qTitle}
                onChange={changeHandler}
                required
                placeholder="Quiz title"
              />
            </div>

            <div className="mb-3">
              <label>From Date</label>
              <input
                disabled={submitting}
                className="form-control"
                type="date"
                name="qFromDate"
                value={state.qFromDate}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>To Date (Deadline For doing this quiz)</label>
              <input
                disabled={submitting}
                className="form-control"
                type="date"
                name="qToDate"
                value={state.qToDate}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>Start Time</label>
              <input
                disabled={submitting}
                className="form-control"
                type="time"
                name="qFromTime"
                value={state.qFromTime}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>End Time</label>
              <input
                disabled={submitting}
                className="form-control"
                type="time"
                name="qToTime"
                value={state.qToTime}
                onChange={changeHandler}
                required
              />
            </div>

            <div className="mb-3">
              <label>Total Marks</label>
              <input
                disabled={submitting}
                className="form-control"
                type="number"
                name="qTotalMarks"
                value={state.qTotalMarks}
                onChange={changeHandler}
                placeholder="Enter total Marks"
                required
              />
            </div>

            <div className="mb-3">
              <label>Users Limit</label>
              <input
                disabled={submitting}
                className="form-control"
                type="number"
                name="qUserLimit"
                value={state.qUserLimit}
                onChange={changeHandler}
                placeholder="Enter maximum number of users to attempt this quiz"
                required
              />
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select
                disabled={submitting}
                className="form-select"
                name="qIsActive"
                value={state.qIsActive}
                onChange={changeHandler}
                required
              >
                <option value={false}>Disactivate</option>
                <option value={true}>Activate</option>
              </select>
            </div>
          </CModalBody>
          <CModalFooter>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting && <CSpinner size="sm" />} Save changes
            </button>
          </CModalFooter>
        </form>
      </CModal>
    </>
  );
}

export default Edit;
