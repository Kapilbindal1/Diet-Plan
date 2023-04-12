import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCilck = () => {
    navigate("/signup");
  };
  useEffect(() => {
    navigate("/detail");
  }, []);

  return <></>;
};
