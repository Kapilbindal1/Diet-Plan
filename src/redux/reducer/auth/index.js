import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},
  isLoading: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    loginRequest: {
      reducer: (state) => {},
      prepare: (requestBody) => {
        return {
          payload: { requestBody },
        };
      },
    },
    loginSuccess: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.userData = {};
      state.isLoading = false;
    },
    logoutRequest: (state, action) => {
      state.userData = {};
      state.isLoading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginRequest, loginSuccess, loginFailure, logoutRequest } =
  authSlice.actions;

export default authSlice.reducer;
