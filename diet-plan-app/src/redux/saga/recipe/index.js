import { call, put, takeLatest } from "redux-saga/effects";

import * as services from "../../../services";
import { errorAlert, successAlert } from "../../../utils";
import {
  getRecipeData,
  genratePdf,
  genratePdfWithEmail,
  genrateMealRecipe,
} from "../../reducer/recipe";

function* getRecipeDataRequest(action) {
  try {
    const response = yield call(
      services.getRecipeRequest,
      action.payload.userId,
    );
    console.log("===>response", response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      successAlert("Successfully added answers.");
      action.payload.successCallback(data);
    } else {
      errorAlert("Failed to added answers");
      action.payload.failureCallback("error from recipe");
    }
  } catch (e) {
    errorAlert("Failed to added answers");
    action.payload.failureCallback("error from recipe");
  }
}

function* genrateMealPdfRequest(action) {
  try {
    const response = yield call(
      services.genrateMealPdf,
      action.payload.mealData,
    );
    console.log("===>response", response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      successAlert("Successfully added answers.");
      action.payload.successCallback(data);
    } else {
      errorAlert("Failed to added answers");
      action.payload.failureCallback("Pdf error");
    }
  } catch (e) {
    errorAlert("Failed to added answers");
    action.payload.failureCallback("Pdf error");
  }
}

function* genrateMealPdfWithEmailRequest(action) {
  const { recipeData, email } = action.payload.mealDataWithEmail;
  try {
    const response = yield call(
      services.genrateMealPdfWithEmail,
      recipeData,
      email,
    );
    console.log("===>response", response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      successAlert("Successfully added answers.");
      action.payload.successCallback(data);
    } else {
      errorAlert("Failed to added answers");
      action.payload.failureCallback("error from recipe");
    }
  } catch (e) {
    errorAlert("Failed to added answers");
    action.payload.failureCallback("error from recipe");
  }
}

function* genrateMealRecipeRequest(action) {
  const meal = action.payload.meal;

  try {
    const response = yield call(services.genrateMealRecipePlan, meal);
    console.log("===>responsegenrateMealRecipePlan", response);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      successAlert("Successfully added answers.");
      action.payload.successCallback(data);
    } else {
      errorAlert("Failed to added answers");
      action.payload.failureCallback("error from recipe");
    }
  } catch (e) {
    errorAlert("Failed to added answers");
    action.payload.failureCallback("error from recipe");
  }
}

function* recipeSaga() {
  yield takeLatest(getRecipeData.type, getRecipeDataRequest);
  yield takeLatest(genratePdf.type, genrateMealPdfRequest);
  yield takeLatest(genratePdfWithEmail.type, genrateMealPdfWithEmailRequest);
  yield takeLatest(genrateMealRecipe.type, genrateMealRecipeRequest);
}

export default recipeSaga;
