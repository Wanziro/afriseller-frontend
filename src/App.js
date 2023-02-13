import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { APP_COLORS } from "./constants/colors";
import "./scss/style.scss";
import UnProtectedRoute from "./controllers/un-protected-route";
import ProtectedRoute from "./controllers/protected-route";
import Logout from "./views/logout";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCompany } from "./actions/myCompany";
const Home = lazy(() => import("./views/home"));
const Company = lazy(() => import("./views/company"));
const RegisterCompany = lazy(() => import("./views/register-company"));
const Attempt = lazy(() => import("./views/attempt"));

const loading = (
  <div className="pt-3 text-center">
    <div
      className="sk-spinner sk-spinner-pulse"
      color={APP_COLORS.DARK_GREEN}
    ></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/login"));
const Register = React.lazy(() => import("./views/register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const dispatch = useDispatch();
  const { hasACompany } = useSelector((state) => state.user);
  useEffect(() => {
    if (hasACompany) {
      dispatch(fetchMyCompany());
    }
  }, [hasACompany]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Suspense fallback={loading}>
                <Home />
              </Suspense>
            }
          />
          <Route
            exact
            path="/company/:id"
            element={
              <Suspense fallback={loading}>
                <Company />
              </Suspense>
            }
          />
          <Route
            exact
            path="/attempt/:companyId/:quizId"
            element={
              <Suspense fallback={loading}>
                <ProtectedRoute>
                  <Attempt />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route exact path="/logout" element={<Logout />} />
          <Route
            exact
            path="/login"
            element={
              <Suspense fallback={loading}>
                <UnProtectedRoute>
                  <Login />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Suspense fallback={loading}>
                <UnProtectedRoute>
                  <Register />
                </UnProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/registercompany"
            element={
              <Suspense fallback={loading}>
                <ProtectedRoute>
                  <RegisterCompany />
                </ProtectedRoute>
              </Suspense>
            }
          />
          <Route
            exact
            path="/404"
            element={
              <Suspense fallback={loading}>
                <Page404 />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={loading}>
                <DefaultLayout />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
