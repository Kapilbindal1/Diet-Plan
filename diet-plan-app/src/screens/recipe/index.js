import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecipeData,
  genratePdf,
  genratePdfWithEmail,
} from "../../redux/reducer/recipe";
import Loader from "../../component/loader";
import logo from "../../assets/logo-brown.svg";
import EmailModalPop from "../../component/modal/emailModal";
import close from "../../assets/close.svg";

export const Recipe = () => {
  // const [recipeData, setRecipeData] = useState({});

  const [pdfurl1, setPdfUrl] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isDisclaimer, setIsDisclaimer] = useState(false);

  const dispatch = useDispatch();

  const recipeData = useSelector((state) => state.user.userData);
  console.log("====>recipeData", recipeData);
  // useEffect(() => {
  //   if (!!userId)
  //     dispatch(
  //       getRecipeData(
  //         userId,
  //         (res) => {
  //           console.log("===>res", res);
  //           if (Object.keys(res).length > 0) {
  //             setIsLoading(false);
  //             setRecipeData(res);
  //           }
  //         },
  //         (e) => {
  //           setIsLoading(false);
  //           console.log("===>e", e);
  //         },
  //       ),
  //     );
  // }, [userId]);

  useEffect(() => {
    setIsDisclaimer(true);
  }, []);

  useEffect(() => {
    if (Object.keys(recipeData).length > 0)
      dispatch(
        genratePdf(
          recipeData,
          (base64Url1) => {
            const pdfData = atob(base64Url1);
            const byteArray = new Uint8Array(
              pdfData.split("").map((char) => char.charCodeAt(0)),
            );
            const pdfBlob = new Blob([byteArray], { type: "application/pdf" });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            setPdfUrl(pdfUrl);
          },
          (e) => {
            console.log(e);
          },
        ),
      );
  }, [Object.keys(recipeData).length]);

  const handlePdfWithEmail = () => {
    // let obj = { recipeData: recipeData, email: "bgarg@innow8apps.com" };
    // console.log("====>sendMail");
    // dispatch(
    //   genratePdfWithEmail(
    //     obj,
    //     (res) => {},
    //     (e) => {},
    //   ),
    // );
    setIsModal(true);
  };

  return (
    <React.Fragment>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      {isDisclaimer && (
        <p className="disclaimer">
          The diet plan suggestions provided by our app are generated using
          Artificial Intelligence (AI) algorithms based on your input data. We
          strive to provide the best possible recommendations, but we cannot
          guarantee the accuracy, completeness, or usefulness of any information
          provided.
          <img src={close} alt="close" onClick={() => setIsDisclaimer(false)} />
        </p>
      )}
      <div className="container">
        <div className="d-flex mt-4 justify-content-between align-items-center">
          <img src={logo} alt="logo" />
          {/* <iframe src={pdfurl1} width="100%" height="500px"></iframe> */}

          <div className="d-flex">
            {/* <button className="secondary-solid me-1" onClick={handleSavePdf}>
              Download PDF
            </button> */}
            <a
              className="secondary-solid me-1"
              href={pdfurl1}
              download={"diet-meal"}
            >
              Download PDF
            </a>

            <button className="secondary-solid" onClick={handlePdfWithEmail}>
              Send Mail
            </button>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            {Object.keys(recipeData).length > 0 &&
              Object.keys(recipeData?.dietPlan).map((day) => {
                return (
                  <div className="col-md-4 mb-3" key={day}>
                    <div className="diet-cards">
                      <h3 className="days-number">
                        {day?.charAt(0)?.toUpperCase() + day?.slice(1)}
                      </h3>
                      <p className="meals">
                        <span className="meal-time">Breakfast:</span>{" "}
                        <span className="meal-description">
                          {recipeData?.dietPlan[day]?.breakfast
                            ? recipeData?.dietPlan[day]?.breakfast
                            : recipeData?.dietPlan[day]?.Breakfast}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Morning Snack:</span>{" "}
                        <span className="meal-description">
                          {recipeData?.dietPlan[day]?.morningSnack
                            ? recipeData?.dietPlan[day]?.morningSnack
                            : recipeData?.dietPlan[day]["Morning Snack"]}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Lunch:</span>{" "}
                        <span className="meal-description">
                          {recipeData?.dietPlan[day]?.lunch
                            ? recipeData?.dietPlan[day]?.lunch
                            : recipeData?.dietPlan[day]?.Lunch}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Evening Snack:</span>{" "}
                        <span className="meal-description">
                          {recipeData?.dietPlan[day]?.eveningSnack
                            ? recipeData?.dietPlan[day]?.eveningSnack
                            : recipeData?.dietPlan[day]["Evening Snack"]}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Dinner:</span>{" "}
                        <span className="meal-description">
                          {recipeData?.dietPlan[day]?.dinner
                            ? recipeData?.dietPlan[day]?.dinner
                            : recipeData?.dietPlan[day]?.Dinner}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {/* )} */}
      <EmailModalPop
        setIsModal={setIsModal}
        isModal={isModal}
        recipeData={recipeData}
      />
    </React.Fragment>
  );
};
