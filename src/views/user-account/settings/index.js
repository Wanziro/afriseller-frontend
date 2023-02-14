import { CCol, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const initialState = { names: "", phone: "", email: "" };
function Settings() {
  const { names, phone, email } = useSelector((state) => state.user);
  const [state, setState] = useState(initialState);
  useEffect(() => {
    setState({ names, phone, email });
  }, []);
  return (
    <div>
      <form>
        <CRow>
          <CCol md={6} className="mb-3">
            <label>Names</label>
            <input
              type="text"
              className="form-control"
              required
              value={state.names}
            />
          </CCol>
          <CCol md={6} className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={state.email}
            />
          </CCol>
          <CCol md={6} className="mb-3">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              required
              value={state.phone}
            />
          </CCol>
          <CCol md={6} className="mb-3">
            <button className="btn btn-primary">Update info</button>
          </CCol>
          <CCol md={12} className="mb-3">
            <button className="btn btn-info" type="button">
              Change password
            </button>
          </CCol>
        </CRow>
      </form>
    </div>
  );
}

export default Settings;
