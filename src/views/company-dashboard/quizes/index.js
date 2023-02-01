import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CRow,
  CTooltip,
} from "@coreui/react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import CIcon from "@coreui/icons-react";
import { cilCheck, cilDelete, cilPen, cilTrash } from "@coreui/icons";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler } from "src/helpers";
import Edit from "./edit";
const Quizes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const { company } = useSelector((state) => state.myCompany);
  const [isLoading, setIsLoading] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const fetchData = () => {
    setIsLoading(true);
    Axios.get(
      BACKEND_URL + "/quizes/mine/" + company?.companyId + "/?token=" + token
    )
      .then((res) => {
        setTimeout(() => {
          setQuizes(res.data.quizes);
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs={12} md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>All Quizes</strong>
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
                        <th>From</th>
                        <th>To</th>
                        <th>Limit</th>
                        <th>Marks</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quizes.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.qTitle}</td>
                          <td>{item.qFromDate}</td>
                          <td>{item.qToDate}</td>
                          <td>{item.qUserLimit}</td>
                          <td>{item.qTotalMarks}</td>
                          <td>{item.qIsActive ? "Active" : "Not Active"}</td>
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

export default Quizes;
