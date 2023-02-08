import Axios from "axios";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler } from "src/helpers";
export const SET_ACTIVE_COMPANIES = "SET_ACTIVE_COMPANIES";
export const SET_IS_LOADING_ACTIVE_COMPANIES =
  "SET_IS_LOADING_ACTIVE_COMPANIES";

export const setActiveCompanies = (company) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_COMPANIES,
    payload: company,
  });
};

export const setLoadingActiveCompanies = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING_ACTIVE_COMPANIES,
    payload: trueOrFalse,
  });
};

export const fetchActiveCompanies = () => (dispatch, getState) => {
  const { user } = getState();
  dispatch(setLoadingActiveCompanies(true));
  Axios.get(BACKEND_URL + "/companies")
    .then((res) => {
      setTimeout(() => {
        dispatch(setLoadingActiveCompanies(false));
        dispatch(setActiveCompanies(res.data.companies));
      }, 1000);
    })
    .catch((error) => {
      setTimeout(() => {
        dispatch(setLoadingActiveCompanies(false));
        // errorHandler(error);
      }, 1000);
    });
};
