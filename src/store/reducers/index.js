import { combineReducers } from "redux";
import loading from "./loadingReducer";
import error from "./errorReducer";
import customers from "./cutomers/customerReducer";

const rootReducers = combineReducers({
  loading,
  error,
  customers,
});

export default rootReducers;
