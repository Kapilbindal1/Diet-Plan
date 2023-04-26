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
import Loader from "../loader";

import { useDispatch, useSelector } from "react-redux";

const EmailModalPop = ({ isModal, setIsModal, recipeData, userId }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleGetPlan = () => {
    testEmail(email);
    if (error.length > 0 || email.length === 0) {
      return;
    }
    setIsLoading(true);
    let obj = { recipeData: recipeData, email: email, userId: userId };
    dispatch(
      genratePdfWithEmail(
        obj,
        (res) => {
          setIsModal(false);
          setIsLoading(false);
        },
        (e) => {
          setIsModal(false);
          setIsLoading(false);
        },
      ),
    );
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
        {isLoading ? (
          <div className="get-pdf-loader">
            <Loader isMail />
          </div>
        ) : (
          <div>
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
          </div>
        )}
      </Modal>
    </React.Fragment>
  );
};
export default EmailModalPop;
