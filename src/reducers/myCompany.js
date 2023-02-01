import { SET_COMPANY, SET_IS_LOADING_COMPANY } from "../actions/myCompany";

const initialState = {
  company: {},
  isLoading: false,
};

const MyCompany = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPANY:
      return { ...state, company: action.payload };
    case SET_IS_LOADING_COMPANY:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default MyCompany;
