import React from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const handleCilck = () => {
    navigate("/signup");
    console.log("check");
  };
  return (
    <div>
      Login
      <button onClick={handleCilck}>navigate</button>
    </div>
  );
};
