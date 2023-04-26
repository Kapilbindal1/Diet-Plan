import config from "./Config";
import { postDataApi } from "../apiCaller";

export const loginRequest = (userCredential) => {
  const request = config.login;
  return postDataApi({
    path: request.path,
    // data: {
    //   username_email: userCredential.email,
    //   password: userCredential.password,
    // },
  });
};
