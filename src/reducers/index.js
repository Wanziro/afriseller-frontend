import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import myCompany from "./myCompany";
import activeCompanies from "./activeCompanies";

const rootReducer = combineReducers({
  user,
  app,
  myCompany,
  activeCompanies,
});

export default rootReducer;
