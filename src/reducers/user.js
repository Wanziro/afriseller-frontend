import {
  SET_USER_NAMES,
  SET_USER_PHONE,
  SET_USER_EMAIL,
  SET_USER_ROLE,
  SET_USER_TOKEN,
  SET_USER_ID,
  SET_USER_HAS_A_COMPANY,
  RESET_USER,
} from "../actions/user";

const initialState = {
  names: "",
  userId: "",
  phone: "",
  email: "",
  role: "",
  token: "",
  hasACompany: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAMES:
      return { ...state, names: action.payload };
    case SET_USER_ID:
      return { ...state, userId: action.payload };
    case SET_USER_PHONE:
      return { ...state, phone: action.payload };
    case SET_USER_EMAIL:
      return { ...state, email: action.payload };
    case SET_USER_ROLE:
      return { ...state, role: action.payload };
    case SET_USER_TOKEN:
      return { ...state, token: action.payload };
    case SET_USER_HAS_A_COMPANY:
      return { ...state, hasACompany: action.payload };
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
