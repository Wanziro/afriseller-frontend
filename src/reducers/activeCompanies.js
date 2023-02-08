import {
  SET_ACTIVE_COMPANIES,
  SET_IS_LOADING_ACTIVE_COMPANIES,
} from "../actions/activeCompanies";

const initialState = {
  companies: [],
  isLoading: false,
};

const MyCompany = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_COMPANIES:
      return { ...state, companies: action.payload };
    case SET_IS_LOADING_ACTIVE_COMPANIES:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default MyCompany;
