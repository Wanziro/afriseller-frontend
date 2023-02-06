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
  qstId: "",
  companyId: "",
  quizId: "",
  qstTitle: "",
  qstMarks: "",
  qstType: "",
};
function Edit({ showModal, setShowModal, editItem, fetchData, quizes }) {
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/questionbanks/", { ...state, token })
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
              <label>Quiz</label>
              <select
                disabled={submitting}
                className="form-select"
                type="text"
                name="quizId"
                value={state.quizId}
                onChange={changeHandler}
                required
              >
                <option value="">Choose Quiz</option>
                {quizes.map((item, index) => (
                  <option key={index} value={item.qId}>
                    {item.qTitle}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Title</label>
              <input
                disabled={submitting}
                className="form-control"
                type="text"
                name="qstTitle"
                value={state.qstTitle}
                onChange={changeHandler}
                required
                placeholder="Question title"
              />
            </div>
            <div className="mb-3">
              <label>Marks</label>
              <input
                disabled={submitting}
                className="form-control"
                type="number"
                name="qstMarks"
                value={state.qstMarks}
                onChange={changeHandler}
                required
                placeholder="Question Marks"
              />
            </div>
            <div className="mb-3">
              <label>
                <b>Question Type</b>
              </label>{" "}
              <br />
              <input
                type="radio"
                name="type"
                disabled={submitting}
                checked={state.qstType === "radio"}
                onClick={() => setState({ ...state, qstType: "radio" })}
                required
              />{" "}
              Radio Button &nbsp;&nbsp;
              <input
                type="radio"
                name="type"
                disabled={submitting}
                checked={state.qstType === "checkbox"}
                onClick={() => setState({ ...state, qstType: "checkbox" })}
                required
              />{" "}
              Check Box
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
