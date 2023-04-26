import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import user from "./user";
import recipe from "./recipe";

const RootReducer = combineReducers({
  auth,
  user,
  recipe,
});

export default RootReducer;
