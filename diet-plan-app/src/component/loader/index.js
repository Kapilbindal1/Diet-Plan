import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div>We are fetching your data wait a minute...</div>
    </div>
  );
};

export default Loader;
