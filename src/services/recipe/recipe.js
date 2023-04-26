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

export const genrateMealPdfWithEmail = (data, email, userId) => {
  const request = config.genrateMealWithEmailPdf;
  return postDataApi({
    path: request.path,
    data: {
      dietPlan: data.dietPlan,
      userEmailAddress: email,
      userId: userId,
    },
  });
};

export const genrateMealRecipePlan = (meal) => {
  const request = config.generateRecipe;
  return postDataApi({
    path: request.path,
    data: {
      meal,
    },
  });
};
