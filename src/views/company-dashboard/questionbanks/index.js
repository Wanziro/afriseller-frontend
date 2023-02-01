import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
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
import { cilCheck, cilDelete, cilPen, cilTrash } from "@coreui/icons";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler, toastMessage } from "src/helpers";
import Edit from "./edit";
import CirclePlaceHolder from "src/components/placeholders/circle";
import axios from "axios";

const initialState = {
  companyId: "",
  quizId: "",
  qstTitle: "",
  qstMarks: "",
};
const QuestionBanks = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { company } = useSelector((state) => state.myCompany);
  const [isLoadingQuizes, setIsLoadingQuizes] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [questionBanks, setQuestionBanks] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [state, setState] = useState(initialState);
  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const fetchData = () => {
    setIsLoading(true);
    Axios.get(
      BACKEND_URL +
        "/questionbanks/mine/" +
        company?.companyId +
        "/?token=" +
        token
    )
      .then((res) => {
        setTimeout(() => {
          setQuestionBanks(res.data.qbanks);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoading(false);
        }, 1000);
      });
  };
  const fetchQuizes = () => {
    setIsLoadingQuizes(true);
    Axios.get(
      BACKEND_URL + "/quizes/mine/" + company?.companyId + "/?token=" + token
    )
      .then((res) => {
        setTimeout(() => {
          setQuizes(res.data.quizes);
          setIsLoadingQuizes(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoadingQuizes(false);
        }, 1000);
      });
  };
  useEffect(() => {
    fetchData();
    fetchQuizes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios
      .post(BACKEND_URL + "/questionbanks/", {
        ...state,
        companyId: company.companyId,
        token,
      })
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", res.data.msg);
          setState(initialState);
          setSubmitting(false);
          fetchData();
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setSubmitting(false);
        }, 1000);
      });
  };

  return (
    <>
      <CRow>
        <CCol xs={8} md={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Question Banks</strong>
            </CCardHeader>
            <CCardBody>
              {isLoading ? (
                <RowsPlaceHolder />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Marks</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {questionBanks.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.qstTitle}</td>
                          <td>{item.qstMarks}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setEditItem(item);
                                setShowEditModal(true);
                              }}
                            >
                              <CIcon icon={cilPen} />
                            </button>
                            &nbsp;
                            <button className="btn btn-danger">
                              <CIcon icon={cilTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={4} md={4}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Add Question</strong>
            </CCardHeader>
            <CCardBody>
              {isLoadingQuizes ? (
                <CirclePlaceHolder />
              ) : (
                <form onSubmit={handleSubmit}>
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
                  <div className="text-end">
                    <button
                      disabled={submitting}
                      type="submit"
                      className="btn btn-primary"
                    >
                      {submitting && <CSpinner size="sm" />} Save Question
                    </button>
                  </div>
                </form>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <Edit
        showModal={showEditModal}
        setShowModal={setShowEditModal}
        editItem={editItem}
        fetchData={fetchData}
      />
    </>
  );
};

export default QuestionBanks;
