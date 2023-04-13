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

import { useDispatch, useSelector } from "react-redux";

const EmailModalPop = ({ isModal, setIsModal, recipeData, userId }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
    const value = validateEmail(e.target.value);
    if (value) {
      setError("");
    } else {
      setError("Enter your valid email");
    }
  };
  const validateEmail = (email) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  };
  const testEmail = (email) => {
    if (!email) {
      setError("Enter your email");
    } else {
      if (!validateEmail(email)) {
        setError("Enter your valid email");
      }
    }
  };
  console.log("===>error", error);
  const handleGetPlan = () => {
    testEmail(email);
    if (error.length > 0) {
      return;
    }
    let obj = { recipeData: recipeData, email: email, userId: userId };
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
        className="common-modal small-modal modal-dialog-centered"
        isOpen={isModal}
        // toggle={toggle}
      >
        <div className="close-icon">
          <img
            src={close}
            alt="close"
            onClick={() => {
              setIsModal(false);
              setError("");
            }}
          />
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
            <div style={{ color: "red", fontSize: 14 }}>{error}</div>
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
