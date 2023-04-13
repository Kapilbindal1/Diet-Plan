import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isLoading: false,
  userId: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUserAnswerRequest: {
      reducer: (state) => {
        state.isLoading = true;
      },
      prepare: (requestBody) => {
        return {
          payload: { requestBody },
        };
      },
    },
    userAnswerAddedSuccess: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    },
    addUserDataId: (state, action) => {
      state.userId = action.payload;
      state.isLoading = false;
    },
    userAnswerAddedFailure: (state, action) => {
      state.userData = {};
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserAnswerRequest,
  userAnswerAddedSuccess,
  userAnswerAddedFailure,
  addUserDataId,
} = userSlice.actions;

export default userSlice.reducer;
