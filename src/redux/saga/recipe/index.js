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
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      // successAlert("Successfully added answers.");
      action.payload.successCallback(data);
    } else {
      // errorAlert("Failed to added answers");
      action.payload.failureCallback("error from recipe");
    }
  } catch (e) {
    // errorAlert("Failed to added answers");
    action.payload.failureCallback("error from recipe");
  }
}

function* genrateMealPdfRequest(action) {
  try {
    const response = yield call(
      services.genrateMealPdf,
      action.payload.mealData,
    );
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      successAlert("Successfully");
      action.payload.successCallback(data);
    } else {
      errorAlert("Failed");
      action.payload.failureCallback("Pdf error");
    }
  } catch (e) {
    errorAlert("Failed to added answers");
    action.payload.failureCallback("Pdf error");
  }
}

function* genrateMealPdfWithEmailRequest(action) {
  const { recipeData, email, userId } = action.payload.mealDataWithEmail;
  try {
    const response = yield call(
      services.genrateMealPdfWithEmail,
      recipeData,
      email,
      userId,
    );

    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      successAlert("Diet plan has been sent to your mail.");
      action.payload.successCallback(data);
    } else {
      errorAlert("Failed to send diet plan");
      action.payload.failureCallback("Failed to send diet plan");
    }
  } catch (e) {
    errorAlert("Failed to send diet plan");
    action.payload.failureCallback("Failed to send diet plan");
  }
}

function* genrateMealRecipeRequest(action) {
  const meal = action.payload.meal;

  try {
    const response = yield call(services.genrateMealRecipePlan, meal);
    const { status, statusText, data = [] } = response || {};
    if (status === 200) {
      // successAlert("Successfully added answers.");
      action.payload.successCallback(data);
    } else {
      // errorAlert("Failed to added answers");
      action.payload.failureCallback("error from recipe");
    }
  } catch (e) {
    // errorAlert("Failed to added answers");
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
