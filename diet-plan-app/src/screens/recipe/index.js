import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRecipeData } from "../../redux/reducer/recipe";
import { data } from "../../utils/const";
import Loader from "../../component/loader";
import logo from "../../assets/logo-brown.svg";

export const Recipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.userData._id);

  //   useEffect(() => {
  //     dispatch(
  //       getRecipeData(
  //         userId,
  //         (res) => {
  //           console.log("===>res", res);
  //           if (Object.keys(res.dietPlan).length > 0) {
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
  //   }, []);
  console.log("===>recipeData", data);
  return (
    // <div>
    //   {¸¸ˀˀˀ? (
    //     <Loader />
    //   ) : (
    //     <div>
    //       {Object.keys(recipeData).length > 0 &&
    //         Object.values(recipeData).map((meal) => {
    //           console.log("===>meal", meal);
    //           return <h1>{meal.breakfast}</h1>;
    //         })}
    //     </div>
    //   )}
    // </div>
    <>
      {false ? (
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
              {Object.keys(data.dietPlan).map((day) => {
                return (
                  <div className="col-md-4 mb-3" key={day}>
                    <div className="diet-cards">
                      <h3 className="days-number">{day}</h3>
                      <p className="meals">
                        <span className="meal-time">Breakfast:</span>{" "}
                        <span className="meal-description">
                          {data.dietPlan[day]?.Breakfast}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Morning Snack:</span>{" "}
                        <span className="meal-description">
                          {data.dietPlan[day]?.MorningSnack}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Lunch:</span>{" "}
                        <span className="meal-description">
                          {data.dietPlan[day]?.Lunch}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Evening Snack:</span>{" "}
                        <span className="meal-description">
                          {data.dietPlan[day]?.EveningSnack}
                        </span>
                      </p>
                      <p className="meals">
                        <span className="meal-time">Dinner:</span>{" "}
                        <span className="meal-description">
                          {data.dietPlan[day]?.Dinner}
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
    </>
  );
};
