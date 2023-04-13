import React, { useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/style/slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { detail } from "../../utils/const";
import Fruits from "../../assets/gif/fruits.gif";
import logo from "../../assets/images/logo-orange.svg";
import next from "../../assets/images/next.svg";
import prev from "../../assets/images/prev.svg";
import { addUserAnswerRequest } from "../../redux/reducer/user";

const SlickSlider = () => {
  const [value, setValue] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quesAnswArr, setQuesAnswArr] = useState(detail);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSlidePrev = () => {
    if (value === 0) {
      return;
    }
    setValue((prev) => prev - 1);
  };

  const handleSlideNext = () => {
    if (value === quesAnswArr.length - 1) {
      return;
    }
    handleNextButton(quesAnswArr[value]);
  };

  const onHandleAnswers = (
    type,
    option,
    ansType,
    questionIndex,
    answerIndex,
  ) => {
    setAnswers({ ...answers, [type]: option.toLowerCase() });
    setError("");
    if (ansType === "input") {
      return;
    }
    const newQuestionsState = [...quesAnswArr];
    const newAnswers = [...newQuestionsState[questionIndex].answers];
    newAnswers.forEach((answer, index) => {
      answer.isSelected = index === answerIndex;
    });
    newQuestionsState[questionIndex].answers = newAnswers;
    if (value !== quesAnswArr.length - 1) {
      setError("");
      setValue((prev) => prev + 1);
    }
    setQuesAnswArr(newQuestionsState);
  };

  const getAlaphabet = (answerIndex) => {
    const char = "A";
    const asciiValue = char.charCodeAt(0);
    const character1 = String.fromCharCode(asciiValue + answerIndex);

    return character1;
  };

  const handleNextButton = (item) => {
    console.log(item, "itemitem==>>222", answers);

    let check = false;
    const regex = /^[0-9]*$/;
    if (item.option_type === "list" && item.answer_type === null) {
      check = item?.answers?.some((item) => {
        if (item.isSelected === false) {
          return false;
        } else {
          return true;
        }
      });
    } else if (item.option_type === null && item.answer_type === "input") {
      if (
        answers.height !== undefined &&
        answers.height !== "" &&
        item.type !== "weight"
      ) {
        check = true;
      } else if (
        answers.weight !== undefined &&
        answers.weight !== "" &&
        item.type !== "height"
      ) {
        check = true;
      }
    } else {
      check = false;
    }

    if (check) {
      setError("");
      setValue((prev) => prev + 1);
    } else {
      if (item.answer_type === "input") {
        if (item.type === "weight") {
          setError(`Please enter your weight`);
        } else {
          setError(`Please enter your height`);
        }
      } else {
        if (item.type === "fitnessGoals")
          setError(`Please select your health goal`);
        else if (item.type === "dietaryPreference") {
          setError(`Please select your dietary preference`);
        } else {
          setError(`Please select your ${item.type}`);
        }
      }
    }
  };
  const handleSubmit = () => {
    if (answers.medicalHistory !== undefined) {
      dispatch(addUserAnswerRequest(answers));
      navigate("/recipe");
    } else {
      setError(`Please select your medical history`);
    }
  };

  return (
    <div className="container-fluid mt-0 mt-md-4">
      <div className="logo-header">
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
      <div className="slider-wraper">
        <div className="container">
          <>
            {quesAnswArr.length > 0 &&
              quesAnswArr.map((item, questionIndex) => {
                return (
                  <div
                    className={`row align-items-center slides ${
                      value === questionIndex ? "active-slide" : ""
                    }`}
                  >
                    <div className="col-lg-6 col-sm-12 col-md-8 p-0">
                      {value === questionIndex && (
                        <div className="slider-content animate__animated animate__backInUp">
                          <h5 className="steps">{`Step 0${
                            questionIndex + 1
                          }`}</h5>
                          <h2>{item.question}</h2>
                          <h6 className="description">
                            {item?.description?.map((des) => {
                              return (
                                <h6>
                                  {des}
                                  <br />
                                </h6>
                              );
                            })}
                          </h6>
                          <div>
                            {item?.answer_type === "input" && (
                              <input
                                type="number"
                                className="answer-input"
                                placeholder="Type your answer here..."
                                value={
                                  item.type === "weight"
                                    ? answers.weight
                                    : answers.height
                                }
                                onChange={(e) => {
                                  let value = e.target.value;
                                  onHandleAnswers(
                                    item.type,
                                    value,
                                    item?.answer_type,
                                  );
                                }}
                              />
                            )}
                          </div>
                          {item.answers?.map((item2, answerIndex) => {
                            return (
                              <h6
                                className={
                                  item2.isSelected
                                    ? "options active"
                                    : "options"
                                }
                                onClick={() =>
                                  onHandleAnswers(
                                    item.type,
                                    item2.option,
                                    null,
                                    questionIndex,
                                    answerIndex,
                                  )
                                }
                              >
                                <span className="option">
                                  {getAlaphabet(answerIndex)}
                                </span>
                                <span>{item2.option}</span>
                              </h6>
                            );
                          })}
                          <div style={{ color: "red", fontSize: 14 }}>
                            {error}
                          </div>
                          <button
                            className="primary-solid"
                            onClick={
                              value === quesAnswArr.length - 1
                                ? handleSubmit
                                : () => {
                                    handleNextButton(item);
                                  }
                            }
                          >
                            {value === quesAnswArr.length - 1
                              ? "Submit"
                              : "Next"}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="col-lg-6 col-sm-12  col-md-4 p-0">
                      {<img className="slider-img" src={Fruits} />}
                    </div>
                  </div>
                );
              })}
          </>
          <div className="navigation">
            <button
              onClick={() => {
                handleSlidePrev();
              }}
            >
              {value === 0 ? (
                <img
                  src={prev}
                  alt="prev"
                  style={{ transform: "rotate(180deg)" }}
                />
              ) : (
                <img src={next} alt="next" />
              )}
            </button>
            <button
              onClick={() => {
                handleSlideNext();
              }}
            >
              {value === quesAnswArr.length - 1 ? (
                <img src={prev} alt="prev" />
              ) : (
                <img
                  src={next}
                  alt="next"
                  style={{ transform: "rotate(180deg)" }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlickSlider;
