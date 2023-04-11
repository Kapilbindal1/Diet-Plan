import config from "./Config";
import { getDataApi, postDataApi } from "../apiCaller";

export const getRecipeRequest = (id) => {
  const { path } = config.getRecipe;
  return getDataApi({
    path: path(id),
  });
};

export const genrateMealPdf = (data) => {
  const request = config.genrateMealPdf;
  return postDataApi({
    path: request.path,
    data,
  });
};

export const genrateMealPdfWithEmail = (data, email) => {
  const request = config.genrateMealWithEmailPdf;
  return postDataApi({
    path: request.path,
    data: {
      dietPlan: data,
      userEmailAddress: email,
    },
  });
};
