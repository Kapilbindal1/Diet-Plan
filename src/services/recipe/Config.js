export default {
  getRecipe: {
    path: (id) => `generate-mealPlans/${id}`,
  },
  genrateMealPdf: {
    path: `generate-pdf`,
  },
  genrateMealWithEmailPdf: {
    path: `send-mail-with-generated-pdf`,
  },
  generateRecipe: {
    path: "generate-recipe",
  },
};
