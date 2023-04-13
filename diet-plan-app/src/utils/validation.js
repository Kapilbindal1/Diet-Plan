export const userAnswerValidateDetail = (data) => {
  console.log("===>userAnswerValidateDetail", data);
  const errors = {};
  if (!data.age) {
    errors["age"] = "Select your age";
  }
  if (!data.fitnessGoals) {
    errors["fitnessGoals"] = "Select your fitness goal";
  }
  if (!data.dietaryPreference) {
    errors["dietaryPreference"] = "Select your diet preference";
  }
  if (!data.gender) {
    errors["gender"] = "Select your gender";
  }
  if (!data.height) {
    errors["height"] = "Enter your height";
  }
  if (!data.medicalHistory) {
    errors["medicalHistory"] = "Select your medical history";
  }
  if (!data.weight) {
    errors["weight"] = "Enter your weight";
  }
  return errors;
};
