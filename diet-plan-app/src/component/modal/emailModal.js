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
import close from "../../assets/close.svg";

import { useDispatch, useSelector } from "react-redux";

const EmailModalPop = ({ isModal, setIsModal, recipeData }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const onEmailChange = (e) => [setEmail(e.target.value)];

  const handleGetPlan = () => {
    let obj = { recipeData: recipeData, email: email };
    dispatch(
      genratePdfWithEmail(
        obj,
        (res) => {},
        (e) => {},
      ),
    );

    setIsModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        className="common-modal modal-dialog-centered"
        isOpen={isModal}
        // toggle={toggle}
      >
        <div className="close-icon">
          <img src={close} alt="close" onClick={() => setIsModal(false)} />
        </div>
        <ModalHeader>Your personalised meal plan</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter Your Email"
              onChange={onEmailChange}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter className="justify-content-center">
          <Button className="modal-button" onClick={handleGetPlan}>
            Get Plan
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};
export default EmailModalPop;
