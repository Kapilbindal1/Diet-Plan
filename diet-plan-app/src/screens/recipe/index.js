import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getRecipeData,
  genratePdf,
  genratePdfWithEmail,
  genrateMealRecipe,
} from "../../redux/reducer/recipe";
import Loader from "../../component/loader";
import logo from "../../assets/images/logo-orange.svg";
import EmailModalPop from "../../component/modal/emailModal";
import close from "../../assets/images/close.svg";
import fats from "../../assets/images/fats.svg";
import proteins from "../../assets/images/proteins.svg";
import kcal from "../../assets/images/kcal.svg";
import carbs from "../../assets/images/carbs.svg";
import RecipeDetailModalPop from "../../component/modal/recipeDetailModal";

export const Recipe = () => {
  // const [recipeData, setRecipeData] = useState({});

  const [pdfurl1, setPdfUrl] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [isDisclaimer, setIsDisclaimer] = useState(false);
  const [isRecipeDetail, setIsRecipeDetail] = useState(false);
  const [mealRecipeData, setMealRecipeData] = useState({});
  const [mealRecipePlanData, setMealRecipePlanData] = useState({});
  const [isRecipeLoader, setIsRecipeLoader] = useState(true);

  const dispatch = useDispatch();

  const recipeData = useSelector((state) => state.user.userData);
  const isLoading = useSelector((state) => state.user.isLoading);
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
    setIsModal(true);
  };

  const handelRecipeDetail = (mealData) => {
    setMealRecipeData(mealData);
    setIsRecipeLoader(true);
    if (mealData.meal?.length > 0) {
      dispatch(
        genrateMealRecipe(
          mealData.meal,
          (res) => {
            console.log("====>mealRecipeData", res);
            setMealRecipePlanData(res);
            setIsRecipeLoader(false);
          },
          (e) => {
            console.log("====>meal recipe plan detail", e);
            setIsRecipeLoader(false);
          },
        ),
      );
    }
    setIsRecipeDetail(true);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isDisclaimer && (
            <p className="disclaimer">
              The diet plan suggestions provided by our app are generated using
              AI based on your input data. We strive to provide the best
              possible recommendations, but we cannot guarantee the accuracy,
              completeness, or usefulness of any information provided.
              {/* <img src={close} alt="close" onClick={() => setIsDisclaimer(false)} /> */}
            </p>
          )}
          <div className="container">
            <div className="d-flex flex-wrap mt-4 justify-content-between align-items-center">
              <img src={logo} alt="logo" />
              <div className="d-flex flex-wrap">
                <a
                  className="secondary-outline me-4"
                  href={pdfurl1}
                  download={"diet-meal"}
                >
                  Download PDF
                </a>

                <button
                  className="secondary-outline"
                  onClick={handlePdfWithEmail}
                >
                  Send Mail
                </button>
              </div>
            </div>
            <div className="container mt-5">
              <div className="row">
                {Object.keys(recipeData).length > 0 &&
                  Object.entries(recipeData?.dietPlan).map(
                    ([mealName, mealData]) => {
                      return (
                        <div className="col-lg-4 col-xs-12 mb-3" key={mealName}>
                          <div className="diet-cards">
                            <div className="meal-header">
                              <h3 className="meal-title">{mealName}</h3>
                              <span className="total-calories">
                                <img src={kcal} alt="kcal" />
                                {mealData.nutrition?.Calories
                                  ? mealData.nutrition?.Calories
                                  : mealData.totalCalories}
                              </span>
                            </div>

                            <h5 className="meal-name">{mealData.meal}</h5>

                            <div className="Macronutrients-Breakup">
                              <h6 className="nutrients-title">
                                Macronutrients Breakup
                              </h6>
                              <p className="meals">
                                <span className="nutrients">
                                  <img src={proteins} alt="proteins" /> Protein:
                                </span>
                                <span className="nutrients-value">
                                  {mealData.nutrition?.Protein
                                    ? mealData.nutrition?.Protein
                                    : mealData.nutritionalValue?.Protein}
                                </span>
                              </p>
                              <p className="meals">
                                <span className="nutrients">
                                  {" "}
                                  <img src={fats} alt="fats" />
                                  Fats:
                                </span>{" "}
                                <span className="nutrients-value">
                                  {mealData.nutrition?.Fats
                                    ? mealData.nutrition?.Fats
                                    : mealData.nutritionalValue?.Fats}
                                </span>
                              </p>
                              <p className="meals">
                                <span className="nutrients">
                                  <img src={carbs} alt="carbs" />
                                  Carbs:
                                </span>{" "}
                                <span className="nutrients-value">
                                  {mealData.nutrition?.Carbs
                                    ? mealData.nutrition?.Carbs
                                    : mealData.nutritionalValue?.Carbs}
                                </span>
                              </p>
                              <p className="meals"></p>
                            </div>

                            <div className="d-flex justify-content-end">
                              <button
                                className="secondary-outline"
                                onClick={() => handelRecipeDetail(mealData)}
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
          </div>

          <EmailModalPop
            setIsModal={setIsModal}
            isModal={isModal}
            recipeData={recipeData}
          />
          <RecipeDetailModalPop
            isRecipeDetail={isRecipeDetail}
            setIsRecipeDetail={setIsRecipeDetail}
            mealRecipeData={mealRecipeData}
            mealRecipePlanData={mealRecipePlanData}
            isRecipeLoader={isRecipeLoader}
            setMealRecipePlanData={setMealRecipePlanData}
          />
        </>
      )}
    </React.Fragment>
  );
};
