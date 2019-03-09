import { combineReducers } from "redux";
import login from "./auth/login";
import signup from "./user/signup";

export default combineReducers({
  login,
  signup
});
