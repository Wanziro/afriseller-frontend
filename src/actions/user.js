export const SET_USER_NAMES = "SET_USER_NAMES";
export const SET_USER_PHONE = "SET_USER_PHONE";
export const SET_USER_EMAIL = "SET_USER_EMAIL";
export const SET_USER_ROLE = "SET_USER_ROLE";
export const SET_USER_TOKEN = "SET_USER_TOKEN";
export const SET_USER_ID = "SET_USER_ID";
export const SET_USER_HAS_A_COMPANY = "SET_USER_HAS_A_COMPANY";
export const RESET_USER = "RESET_USER";

export const setUserId = (id) => (dispatch) => {
  dispatch({
    type: SET_USER_ID,
    payload: id,
  });
};

export const setUserNames = (names) => (dispatch) => {
  dispatch({
    type: SET_USER_NAMES,
    payload: names,
  });
};

export const setUserPhone = (phone) => (dispatch) => {
  dispatch({
    type: SET_USER_PHONE,
    payload: phone,
  });
};

export const setUserRole = (role) => (dispatch) => {
  dispatch({
    type: SET_USER_ROLE,
    payload: role,
  });
};

export const seUserHasACompany = (trueOrFalse) => (dispatch) => {
  dispatch({
    type: SET_USER_HAS_A_COMPANY,
    payload: trueOrFalse,
  });
};

export const setUserEmail = (email) => (dispatch) => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: email,
  });
};

export const setUserToken = (token) => (dispatch) => {
  dispatch({
    type: SET_USER_TOKEN,
    payload: token,
  });
};

export const resetUser = () => ({ type: RESET_USER });
