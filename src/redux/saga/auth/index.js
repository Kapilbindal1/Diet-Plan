import { call, put, takeLatest } from "redux-saga/effects";

import * as services from "../../../services";
import { errorAlert, successAlert } from "../../../utils";
import { loginRequest, loginSuccess, loginFailure } from "../../reducer/auth";

function* authLoginRequest(action) {
  try {
    const response = yield call(
      services.loginRequest,
      action.payload.requestBody,
    );
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      successAlert("Successfully logged in.");
      yield put(loginSuccess(data));
    } else {
      errorAlert("Failed to login");
      yield put(loginFailure());
    }
  } catch (e) {
    errorAlert("Failed to login");
    yield put(loginFailure());
  }
}

function* authSaga() {
  yield takeLatest(loginRequest.type, authLoginRequest);
}

export default authSaga;
