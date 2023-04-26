import config from "./Config";
import { postDataApi } from "../apiCaller";

export const addUserAnswer = (answerOption) => {
  const request = config.userInputs;
  return postDataApi({
    path: request.path,
    data: {
      ...answerOption,
    },
  });
};
