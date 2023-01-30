import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

// routes config
import adminRoutes from "../sub-routes/admin";
import companyRoutes from "../sub-routes/company";
import { useSelector } from "react-redux";

const AppContent = () => {
  const { role, hasACompany } = useSelector((state) => state.user);
  const [routesToUse, setRoutesToUse] = useState([]);
  useEffect(() => {
    if (role === "admin") {
      setRoutesToUse(adminRoutes);
    }
    if (hasACompany) {
      setRoutesToUse(companyRoutes);
    }
  }, [role]);

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routesToUse.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
