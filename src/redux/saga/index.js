import { all } from "redux-saga/effects";
import authSaga from "./auth";
import userSaga from "./user";
import recipeSaga from "./recipe";

const rootSaga = function* root() {
  yield all([userSaga(), recipeSaga()]);
};
export default rootSaga;
