import React from "react";
import logo from "../../assets/images/wb-logo.svg";

const ErrorMsg = ({ handleLogo }) => {
  return (
    <div className="p-4">
      <div className="error-msg">
        Sorry, the website is currently down for maintenance. We apologize for
        any inconvenience this may cause. Please try again later.
      </div>
    </div>
  );
};

export default ErrorMsg;
