import React, { useState } from "react";
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
import {
  getRecipeData,
  genratePdf,
  genratePdfWithEmail,
} from "../../redux/reducer/recipe";
import close from "../../assets/images/close.svg";
import fats from "../../assets/images/fats.svg";
import proteins from "../../assets/images/proteins.svg";
import kcal from "../../assets/images/kcal.svg";
import carbs from "../../assets/images/carbs.svg";

import { useDispatch, useSelector } from "react-redux";


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
    "1 tablespoon olive oil"
  ],
  instructions: [
    "Preheat the oven to 400 degrees F (200 degrees C).",
    "In a small bowl, mix together the olive oil, garlic powder, onion powder, oregano, basil, salt, and pepper. Rub the mixture onto the chicken breasts.",
    "Place the chicken on a baking sheet and bake for 20 minutes, or until the chicken is cooked through.",
    "Meanwhile, place the vegetables on a separate baking sheet. Drizzle with olive oil and season with salt and pepper. Toss to coat.",
    "Place the vegetables in the oven and bake for 15 minutes, or until the vegetables are tender.",
    "Serve the chicken and vegetables together."
  ]
}

const RecipeDetailModalPop = ({ }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");


  return (
    <React.Fragment>
      <Modal
        className="common-modal modal-dialog-centered"
        isOpen={true}
      // toggle={toggle}
      >
        <div className="close-icon">
          <img src={close} alt="close" /* onClick={() => setDetailModal(false)} */
          />
        </div>
        <ModalHeader className="nutrients-value">{data.name}
          <div className="nutreints-calc">
            <div className="nutreints-calc-val"><img src={proteins} alt="proteins" /> <span>27g</span></div>
            <div className="nutreints-calc-val"><img src={fats} alt="fats" /><span>27g</span></div>
            <div className="nutreints-calc-val"> <img src={carbs} alt="carbs" /><span>27g</span></div>
            <div className="nutreints-calc-val"><img src={kcal} alt="kcal" /><span>27g</span></div>

          </div>
        </ModalHeader>
        <ModalBody className="cooking-modal-body">
          <div className="row">
            <div className="col-md-6">
              <div className="ingredients scroll-bar">
                <h5 className="recipe-title">Ingredients</h5>
                <p>{data.ingredients.join()}</p></div>
            </div>
            <div className="col-md-6"> <div className="cooking-steps ingredients scroll-bar">  <h5 className="recipe-title">Cooking Instructions</h5>{data.instructions.map((item, index) => {
              return (
                <>
                  <p className="steps-list"><span className="steps">{index + 1}</span>{item}</p>
                </>
              )
            })}  </div> </div>
          </div>
        </ModalBody>
        {/* <ModalFooter className="justify-content-center">
          <Button className="modal-button"
          onClick={handleGetPlan} 

          >
            Get Plan
          </Button>
        </ModalFooter> */}
      </Modal>
    </React.Fragment>
  );
};
export default RecipeDetailModalPop;