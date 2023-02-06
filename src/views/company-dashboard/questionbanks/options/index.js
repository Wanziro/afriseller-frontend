import {
  CButton,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler, toastMessage } from "src/helpers";
import RowsPlaceHolder from "src/components/placeholders/rows";
import CIcon from "@coreui/icons-react";
import { cilPen, cilTrash } from "@coreui/icons";
import Confirmation from "src/components/confirmation";

const initialState = {
  quizId: "",
  questionId: "",
  description: "",
  companyId: "",
};
function QuestionOptions({ showModal, setShowModal, question, quizes }) {
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [editDescription, setEditDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [deleteItem, setDeleteItem] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    Axios.post(BACKEND_URL + "/qboptions/", {
      ...state,
      questionId: question.qstId,
      quizId: question.quizId,
      companyId: question.companyId,
      token,
    })
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", res.data.msg);
          setSubmitting(false);
          setState(initialState);
          fetchData();
        }, 1000);
      })

      .catch((error) => {
        setTimeout(() => {
          setSubmitting(false);
          errorHandler(error);
        }, 1000);
      });
  };

  const handleDelete = () => {
    setIsDeleting(true);
    Axios.delete(
      BACKEND_URL + "/qboptions/" + deleteItem.optId + "?token=" + token
    )
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", res.data.msg);
          setIsDeleting(false);
          setOptions(options.filter((item) => item.optId !== deleteItem.optId));
          setDeleteItem({});
        }, 1000);
      })

      .catch((error) => {
        setTimeout(() => {
          setIsDeleting(false);
          errorHandler(error);
        }, 1000);
      });
  };

  const handleSave = () => {
    if (editDescription.trim() === "") {
      return toastMessage("error", "Option can not be empty");
    }
    setIsEditing(true);
    Axios.put(BACKEND_URL + "/qboptions/", {
      ...editItem,
      description: editDescription,
      token,
    })
      .then((res) => {
        setTimeout(() => {
          toastMessage("success", res.data.msg);
          setIsEditing(false);
          setEditItem({});
          fetchData();
        }, 1000);
      })

      .catch((error) => {
        setTimeout(() => {
          setIsEditing(false);
          errorHandler(error);
        }, 1000);
      });
  };

  useEffect(() => {
    if (showModal) {
      fetchData();
      setEditItem({});
      setDeleteItem({});
    }
  }, [showModal]);

  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(BACKEND_URL + "/qboptions/" + question.qstId + "?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setOptions(res.data.qbOptions);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          errorHandler(error);
        }, 1000);
      });
  };

  return (
    <>
      <CModal
        backdrop="static"
        visible={showModal}
        onClose={() => setShowModal(false)}
        size="xl"
      >
        <CModalHeader>
          <CModalTitle>
            QUIZ: {quizes.find((item) => item?.qId == question?.quizId)?.qTitle}{" "}
            | {question?.qstTitle} / {question?.qstMarks} Marks
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit}>
            <CRow>
              <CCol md={8}>
                <h3>Question Options</h3>
                {isLoading ? (
                  <RowsPlaceHolder />
                ) : (
                  <>
                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Option</th>
                            <th>Correct</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {options.map((item, i) => (
                            <tr>
                              <td>
                                {editItem?.optId === item.optId ? (
                                  <textarea
                                    className="form-control"
                                    value={editDescription}
                                    placeholder="Edit question option"
                                    onChange={(e) =>
                                      setEditDescription(e.target.value)
                                    }
                                  />
                                ) : (
                                  item.description
                                )}
                              </td>
                              <td>
                                <input type="checkbox" />
                              </td>
                              <td>
                                {editItem?.optId === item.optId ||
                                deleteItem?.optId === item.optId ? (
                                  isEditing || isDeleting ? (
                                    <CSpinner size="sm" />
                                  ) : (
                                    <>
                                      <span
                                        className="text-primary"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleSave()}
                                      >
                                        Save
                                      </span>
                                      &nbsp;|&nbsp;
                                      <span
                                        className="text-danger"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setEditItem({})}
                                      >
                                        cancel
                                      </span>
                                    </>
                                  )
                                ) : (
                                  <>
                                    <span
                                      className="text-primary"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setEditItem(item);
                                        setEditDescription(item.description);
                                      }}
                                    >
                                      <CIcon icon={cilPen} />
                                    </span>
                                    &nbsp;
                                    <span
                                      className="text-danger"
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setDeleteItem(item);
                                        setShowConfirm(true);
                                      }}
                                    >
                                      <CIcon icon={cilTrash} />
                                    </span>
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </CCol>
              <CCol md={4}>
                <div className="shadow p-3">
                  <h3>Add New Option</h3>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      placeholder="Enter option description"
                      name="description"
                      onChange={changeHandler}
                      value={state.description}
                      required
                      disabled={submitting}
                    ></textarea>
                  </div>
                  <div className="form-group mt-3">
                    <button className="btn btn-primary" type="submit">
                      {submitting && <CSpinner size="sm" />} Save option
                    </button>
                  </div>
                </div>
              </CCol>
            </CRow>
          </form>
        </CModalBody>
      </CModal>
      <Confirmation
        showAlert={showConfirm}
        setShowAlert={setShowConfirm}
        callback={handleDelete}
        title="Do you want to delete this option?"
      />
    </>
  );
}

export default QuestionOptions;
