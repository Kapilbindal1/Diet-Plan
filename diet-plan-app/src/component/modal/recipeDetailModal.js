import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import { genrateMealRecipe } from "../../redux/reducer/recipe";
import close from "../../assets/images/close.svg";
import fats from "../../assets/images/fats.svg";
import proteins from "../../assets/images/proteins.svg";
import kcal from "../../assets/images/kcal.svg";
import carbs from "../../assets/images/carbs.svg";

import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";

const data = {
  name: "Grilled Chicken with Roasted Vegetables",
  ingredients: [
    "4 boneless, skinless chicken breasts",
    "1/4 cup olive oil",
    "1 teaspoon garlic powder",
    "1 teaspoon onion powder",
    "1 teaspoon dried oregano",
    "1 teaspoon dried basil",
    "1/2 teaspoon salt",
    "1/2 teaspoon black pepper",
    "2 cups assorted vegetables (such as bell peppers, zucchini, and/or mushrooms)",
    "1 tablespoon olive oil",
  ],
  instructions: [
    "Preheat the oven to 400 degrees F (200 degrees C).",
    "In a small bowl, mix together the olive oil, garlic powder, onion powder, oregano, basil, salt, and pepper. Rub the mixture onto the chicken breasts.",
    "Place the chicken on a baking sheet and bake for 20 minutes, or until the chicken is cooked through.",
    "Meanwhile, place the vegetables on a separate baking sheet. Drizzle with olive oil and season with salt and pepper. Toss to coat.",
    "Place the vegetables in the oven and bake for 15 minutes, or until the vegetables are tender.",
    "Serve the chicken and vegetables together.",
  ],
};

const RecipeDetailModalPop = ({
  isRecipeDetail,
  setIsRecipeDetail,
  mealRecipeData,
  mealRecipePlanData,
  isRecipeLoader,
  setMealRecipePlanData,
}) => {
  useEffect(() => {}, [mealRecipePlanData]);
  console.log("===>mealRecipeData", mealRecipePlanData);

  const handleModalClose = () => {
    setMealRecipePlanData({});
    setIsRecipeDetail(false);
  };

  return (
    <React.Fragment>
      <Modal
        className="common-modal modal-dialog-centered"
        isOpen={isRecipeDetail}
      >
        {isRecipeLoader ? (
          <Loader />
        ) : (
          <div>
            <div className="close-icon">
              <img src={close} alt="close" onClick={() => handleModalClose()} />
            </div>
            <ModalHeader className="nutrients-value">
              {mealRecipePlanData?.name}
              <div className="nutreints-calc">
                <div className="nutreints-calc-val">
                  <img src={proteins} alt="proteins" />
                  <span>
                    {mealRecipeData.nutrition?.Protein
                      ? mealRecipeData.nutrition?.Protein
                      : mealRecipeData.nutritionalValue?.Protein}
                  </span>
                </div>
                <div className="nutreints-calc-val">
                  <img src={fats} alt="fats" />
                  <span>
                    {mealRecipeData.nutrition?.Fats
                      ? mealRecipeData.nutrition?.Fats
                      : mealRecipeData.nutritionalValue?.Fats}
                  </span>
                </div>
                <div className="nutreints-calc-val">
                  {" "}
                  <img src={carbs} alt="carbs" />
                  <span>
                    {mealRecipeData.nutrition?.Carbs
                      ? mealRecipeData.nutrition?.Carbs
                      : mealRecipeData.nutritionalValue?.Carbs}
                  </span>
                </div>
                <div className="nutreints-calc-val">
                  <img src={kcal} alt="kcal" />
                  <span>
                    {mealRecipeData.nutrition?.Calories
                      ? mealRecipeData.nutrition?.Calories
                      : mealRecipeData?.totalCalories}
                  </span>
                </div>
              </div>
            </ModalHeader>

            <ModalBody className="cooking-modal-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="ingredients scroll-bar">
                    <h5 className="recipe-title">Ingredients</h5>
                    <p>
                      {mealRecipePlanData.ingredients?.length > 0 &&
                        mealRecipePlanData.ingredients.join(" ")}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  <div className="cooking-steps ingredients scroll-bar">
                    {" "}
                    <h5 className="recipe-title">Cooking Instructions</h5>
                    {mealRecipePlanData.instructions?.length > 0 &&
                      mealRecipePlanData.instructions.map((item, index) => {
                        return (
                          <>
                            <p className="steps-list">
                              <span className="steps">{index + 1}</span>
                              {item}
                            </p>
                          </>
                        );
                      })}{" "}
                  </div>{" "}
                </div>
              </div>
            </ModalBody>
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};
export default RecipeDetailModalPop;
