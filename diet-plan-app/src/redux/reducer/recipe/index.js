import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipeData: {},
  isLoading: false,
};

export const recipeSlice = createSlice({
  name: "recipeSlice",
  initialState,
  reducers: {
    getRecipeData: {
      reducer: (state) => {},
      prepare: (userId, successCallback, failureCallback) => {
        return {
          payload: { userId, successCallback, failureCallback },
        };
      },
    },
    genratePdf: {
      reducer: (state) => {},
      prepare: (mealData, successCallback, failureCallback) => {
        return {
          payload: { mealData, successCallback, failureCallback },
        };
      },
    },
    genratePdfWithEmail: {
      reducer: (state) => {},
      prepare: (mealDataWithEmail, successCallback, failureCallback) => {
        console.log("====>mealDataWithEmail", mealDataWithEmail);
        return {
          payload: { mealDataWithEmail, successCallback, failureCallback },
        };
      },
    },
  },
});

// Action creators are generated for each case reducer function
export const { getRecipeData, genratePdf, genratePdfWithEmail } =
  recipeSlice.actions;

export default recipeSlice.reducer;
