import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import myCompany from "./myCompany";

const rootReducer = combineReducers({
  user,
  app,
  myCompany,
});

export default rootReducer;
