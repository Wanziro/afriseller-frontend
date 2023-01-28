import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { APP_COLORS } from "./constants/colors";
import "./scss/style.scss";
const Home = lazy(() => import("./views/home"));

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

class App extends Component {
  render() {
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
              path="/login"
              element={
                <Suspense fallback={loading}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              exact
              path="/register"
              element={
                <Suspense fallback={loading}>
                  <Register />
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
      </>
    );
  }
}

export default App;
