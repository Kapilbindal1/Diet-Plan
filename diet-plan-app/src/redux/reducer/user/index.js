import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isLoading: false,
  userId: "",
  isError: "",
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    addUserAnswerRequest: {
      reducer: (state) => {
        state.isLoading = true;
        state.isError = "";
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
      state.isError = "";
    },
    addUserDataId: (state, action) => {
      state.userId = action.payload;
      state.isLoading = false;
    },
    userAnswerAddedFailure: (state, action) => {
      state.userData = {};
      state.isLoading = false;
      state.isError = action.payload;
    },
    userLogout: (state, action) => {
      state.userData = {};
      state.isLoading = false;
      state.isError = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addUserAnswerRequest,
  userAnswerAddedSuccess,
  userAnswerAddedFailure,
  addUserDataId,
  userLogout,
} = userSlice.actions;

export default userSlice.reducer;
