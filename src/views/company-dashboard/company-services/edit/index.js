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
  title: "",
  description: "",
  isActive: true,
};
function Edit({ showModal, setShowModal, editItem, fetchData }) {
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    Axios.put(BACKEND_URL + "/companyservices/", { ...state, token })
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
                name="title"
                value={state.title}
                onChange={changeHandler}
                required
                placeholder="title"
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                disabled={submitting}
                required
                name="description"
                value={state.description}
                onChange={changeHandler}
                className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <label>Status</label>
              <select
                disabled={submitting}
                className="form-select"
                name="isActive"
                value={state.isActive}
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
