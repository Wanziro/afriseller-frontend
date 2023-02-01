import Axios from "axios";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler } from "src/helpers";
export const SET_COMPANY = "SET_COMPANY";
export const SET_IS_LOADING_COMPANY = "SET_IS_LOADING_COMPANY";

export const setCompany = (company) => (dispatch) => {
  dispatch({
    type: SET_COMPANY,
    payload: company,
  });
};

export const setLoadingCompany = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING_COMPANY,
    payload: trueOrFalse,
  });
};

export const fetchMyCompany = () => (dispatch, getState) => {
  const { user } = getState();
  dispatch(setLoadingCompany(true));
  Axios.get(BACKEND_URL + "/companies/mine/?token=" + user.token)
    .then((res) => {
      setTimeout(() => {
        dispatch(setLoadingCompany(false));
        dispatch(setCompany(res.data.company));
      }, 1000);
    })
    .catch((error) => {
      setTimeout(() => {
        dispatch(setLoadingCompany(false));
        errorHandler(error);
      }, 1000);
    });
};
