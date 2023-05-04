import axios from "axios";

import { store } from "../redux/store";

// const REACT_APP_BASE_URL = "http://192.168.1.11:4001/";
const REACT_APP_BASE_URL = "https://wisebite.onrender.com/";

const customAxios = axios.create({
  baseURL: `${REACT_APP_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const requestHandler = (request) => {
  const accessToken = store?.getState().auth.userData.jwt;
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
};

const responseHandler = (response) => {
  if (response?.data?.status === 401) {
  }

  return response;
};

const errorHandler = (error) => {
  if (error?.response?.status === 403) {
    // Router.push("/login");
  }
  return error.response;
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;
