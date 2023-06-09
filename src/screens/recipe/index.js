import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { genrateMealRecipe } from "../../redux/reducer/recipe";
import { userLogout } from "../../redux/reducer/user";
import { useNavigate } from "react-router-dom";
import Loader from "../../component/loader";
import logo from "../../assets/images/wb-logo.svg";
import EmailModalPop from "../../component/modal/emailModal";
import close from "../../assets/images/close.svg";
import fats from "../../assets/images/fats.svg";
import proteins from "../../assets/images/proteins.svg";
import kcal from "../../assets/images/kcal.svg";
import carbs from "../../assets/images/carbs.svg";
import RecipeDetailModalPop from "../../component/modal/recipeDetailModal";
import { dietNotes } from "../../utils/const";
import ErrorMsg from "../../component/errorMsg";

export const Recipe = () => {
  const [isModal, setIsModal] = useState(false);
  const [isRecipeDetail, setIsRecipeDetail] = useState(false);
  const [mealRecipeData, setMealRecipeData] = useState({});
  const [mealRecipePlanData, setMealRecipePlanData] = useState({});
  const [isRecipeLoader, setIsRecipeLoader] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipeData = useSelector((state) => state.user.userData);

  const isLoading = useSelector((state) => state.user.isLoading);
  const userId = useSelector((state) => state.user.userId);
  const isError = useSelector((state) => state.user.isError);

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
            setMealRecipePlanData(res);
            setIsRecipeLoader(false);
          },
          (e) => {
            console.debug("==>e", e);
            setIsRecipeLoader(false);
          },
        ),
      );
    }
    setIsRecipeDetail(true);
  };

  const handleLogo = () => {
    navigate("/");
    window?.location.reload();
  };

  return (
    <React.Fragment>
      <>
        <p className="disclaimer">
          The diet plan suggestions provided by our app are generated using AI
          based on your input data. We strive to provide the best possible
          recommendations, but we cannot guarantee the accuracy, completeness,
          or usefulness of any information provided.
        </p>
        <div className="container">
          <div className="d-flex px-3 flex-wrap mt-4 justify-content-between align-items-center">
            <img
              className="logo"
              src={logo}
              alt="logo"
              onClick={() => {
                navigate("/");
                window?.location.reload();
              }}
            />
            <div
              className={`d-flex flex-wrap mt-3 ${
                isLoading || (!isLoading && isError) ? "d-none" : ""
              }`}
            >
              <button
                className="secondary-outline"
                onClick={handlePdfWithEmail}
              >
                Get PDF
              </button>
            </div>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : isError.length > 0 ? (
          <ErrorMsg handleLogo={handleLogo} />
        ) : (
          <div>
            <div className="container">
              <div className="container mt-4">
                <div className="row">
                  {Object.keys(recipeData).length > 0 &&
                    Object.entries(recipeData?.dietPlan).map(
                      ([mealName, mealData]) => {
                        return (
                          <div
                            className="col-lg-4 col-xs-12 mb-3"
                            key={mealName}
                          >
                            <div className="diet-cards">
                              <div className="meal-header">
                                <h3 className="meal-title">
                                  {mealName.replace("_", " ")}
                                </h3>
                                <span className="total-calories tooltip-hover">
                                  <img src={kcal} alt="kcal" />
                                  {mealData.nutrition?.calories}
                                  <span class="tooltiptext">Calories</span>
                                </span>
                              </div>

                              <h5 className="meal-name">{mealData.meal}</h5>

                              <div className="Macronutrients-Breakup">
                                <h6 className="nutrients-title">
                                  Macronutrients Breakup
                                </h6>
                                <p className="meals">
                                  <span className="nutrients">
                                    <img src={proteins} alt="proteins" />
                                    Proteins:
                                  </span>
                                  <span className="nutrients-value">
                                    {mealData.nutrition?.proteins}
                                  </span>
                                </p>
                                <p className="meals">
                                  <span className="nutrients">
                                    {" "}
                                    <img src={fats} alt="fats" />
                                    Fats:
                                  </span>{" "}
                                  <span className="nutrients-value">
                                    {mealData.nutrition?.fats}
                                  </span>
                                </p>
                                <p className="meals">
                                  <span className="nutrients">
                                    <img src={carbs} alt="carbs" />
                                    Carbs:
                                  </span>{" "}
                                  <span className="nutrients-value">
                                    {mealData.nutrition?.carbs}
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
                  <div className="col-lg-4 col-xs-12 mb-3">
                    <div className="diet-cards diet-notes">
                      <div className="meal-header">
                        <h3 className="meal-title">Diet Notes</h3>
                      </div>
                      {dietNotes.map(({ id, img, title }) => {
                        return (
                          <p className="meals" key={id}>
                            <span className="nutrients-value">
                              <img src={img} alt="proteins" /> {title}
                            </span>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <EmailModalPop
              setIsModal={setIsModal}
              isModal={isModal}
              recipeData={recipeData}
              userId={userId}
            />
            <RecipeDetailModalPop
              isRecipeDetail={isRecipeDetail}
              setIsRecipeDetail={setIsRecipeDetail}
              mealRecipeData={mealRecipeData}
              mealRecipePlanData={mealRecipePlanData}
              isRecipeLoader={isRecipeLoader}
              setMealRecipePlanData={setMealRecipePlanData}
            />
          </div>
        )}
      </>
    </React.Fragment>
  );
};
