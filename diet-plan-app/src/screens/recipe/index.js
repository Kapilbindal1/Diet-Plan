import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeData } from "../../redux/reducer/recipe";
import Loader from "../../component/loader";
import logo from "../../assets/logo-brown.svg";

export const Recipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userData._id);

  useEffect(() => {
    dispatch(
      getRecipeData(
        userId,
        (res) => {
          console.log("===>res", res);
          if (Object.keys(res).length > 0) {
            setIsLoading(false);
            setRecipeData(res);
          }
        },
        (e) => {
          setIsLoading(false);
          console.log("===>e", e);
        },
      ),
    );
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="d-flex mt-4 justify-content-between align-items-center">
            <img src={logo} alt="logo" />
            <div>
              <button className="secondary-solid me-1">Download PDF</button>
              <button className="secondary-solid">Send Mail</button>
            </div>
          </div>
          <div className="container mt-5">
            <div className="row">
              {Object.keys(recipeData).length > 0 &&
                Object.keys(recipeData.dietPlan).map((day) => {
                  return (
                    <div className="col-md-4 mb-3" key={day}>
                      <div className="diet-cards">
                        <h3 className="days-number">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </h3>
                        <p className="meals">
                          <span className="meal-time">Breakfast:</span>{" "}
                          <span className="meal-description">
                            {recipeData.dietPlan[day].breakfast}
                          </span>
                        </p>
                        <p className="meals">
                          <span className="meal-time">Morning Snack:</span>{" "}
                          <span className="meal-description">
                            {recipeData.dietPlan[day].morningSnack}
                          </span>
                        </p>
                        <p className="meals">
                          <span className="meal-time">Lunch:</span>{" "}
                          <span className="meal-description">
                            {recipeData.dietPlan[day].lunch}
                          </span>
                        </p>
                        <p className="meals">
                          <span className="meal-time">Evening Snack:</span>{" "}
                          <span className="meal-description">
                            {recipeData.dietPlan[day].eveningSnack}
                          </span>
                        </p>
                        <p className="meals">
                          <span className="meal-time">Dinner:</span>{" "}
                          <span className="meal-description">
                            {recipeData.dietPlan[day].dinner}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
