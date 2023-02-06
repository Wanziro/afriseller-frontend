import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFooter,
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
const initialState = { companyId: "", title: "", description: "", image: "" };
const CompanyServices = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { company } = useSelector((state) => state.myCompany);
  const [isLoading, setIsLoading] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [state, setState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchData = () => {
    setIsLoading(true);
    Axios.get(
      BACKEND_URL +
        "/companyservices/" +
        company?.companyId +
        "/?token=" +
        token
    )
      .then((res) => {
        setTimeout(() => {
          setQuizes(res.data.services);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", state.image);
    formData.append("title", state.title);
    formData.append("description", state.description);
    formData.append("companyId", company.companyId);
    Axios.post(BACKEND_URL + "/companyservices/?token=" + token, formData)
      .then((res) => {
        setIsSubmitting(false);
        fetchData();
        toastMessage("success", res.data.msg);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs={8} md={8}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Our Services</strong>
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
                        <th>Image</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizes.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td></td>
                          <td>{item.title}</td>
                          <td>{item.isActive ? "Active" : "Not Active"}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={() => {
                              //   setEditItem(item);
                              //   setShowEditModal(true);
                              // }}
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
          <form onSubmit={handleSubmit}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Add New Service</strong>
              </CCardHeader>
              <CCardBody>
                <div className="mb-3">
                  <label>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={state.title}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      setState({ ...state, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label>Description</label>
                  <textarea
                    disabled={isSubmitting}
                    required
                    value={state.description}
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                    className="form-control"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={(e) =>
                      setState({ ...state, image: e.target.files[0] })
                    }
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </CCardBody>
              <CCardFooter>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting && <CSpinner />} Submit
                </button>
              </CCardFooter>
            </CCard>
          </form>
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

export default CompanyServices;
