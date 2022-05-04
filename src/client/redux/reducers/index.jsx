import { combineReducers } from "redux";
import auth from "./authReducer.jsx";
import notify from "./notifyReducer.jsx";

export default combineReducers({
  auth,
  notify,
});
