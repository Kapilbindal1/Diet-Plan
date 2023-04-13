import React from "react";

const Loader = (props) => {
  return (
    <div className="loader">
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>{props.isRecipeLoader ?
          "Fetching ingredients and recipe details, please wait..." :
          "Generating your custom diet plan, please wait..."}</p>
      </div>
    </div>
  );
};

export default Loader;
