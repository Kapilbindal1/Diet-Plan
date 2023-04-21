import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/style/slider.scss";
import { detail } from "../../utils/const";
import Fruits from "../../assets/gif/fruits.gif";
import logo from "../../assets/images/wb-logo.svg";
import next from "../../assets/images/next.svg";
import prev from "../../assets/images/prev.svg";
import hotCoffee from "../../assets/gif/hotCoffee.gif";
import cup from "../../assets/gif/cup.gif";
import { addUserAnswerRequest, userLogout } from "../../redux/reducer/user";

const SlickSlider = () => {
  const [value, setValue] = useState(0);
  const valueRef = useRef(null);
  const [answers, setAnswers] = useState({});
  const [quesAnswArr, setQuesAnswArr] = useState(detail);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myRef = useRef(null);

  const [isSubmitActive, setIsSubmitActive] = useState(false);

  useEffect(() => {
    dispatch(userLogout());
  }, []);

  const handleSlidePrev = () => {
    if (value === 0) {
      return;
    }
    setError("");
    setValue((prev) => {
      valueRef.current = prev - 1;
      return prev - 1;
    });
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
    if (value === quesAnswArr.length - 1) {
      myRef.current.focus();
    }
    if (type === "name") {
      setAnswers({
        ...answers,
        [type]: option.trimStart(),
      });
    } else {
      setAnswers({ ...answers, [type]: option.toLowerCase() });
    }
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
      setValue((prev) => {
        valueRef.current = prev + 1;
        return prev + 1;
      });
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
        if (Number(answers.height) >= 150 && Number(answers.height) <= 199) {
          check = true;
        }
      } else if (
        answers.weight !== undefined &&
        answers.weight !== "" &&
        item.type !== "height"
      ) {
        if (Number(answers.weight) >= 38 && Number(answers.weight) <= 180) {
          check = true;
        }
      } else if (
        answers.name !== undefined &&
        answers.name !== "" &&
        item.type !== "height" &&
        item.type !== "weight"
      ) {
        check = true;
      }
    } else {
      check = false;
    }

    if (check) {
      setError("");
      setValue((prev) => {
        valueRef.current = prev + 1;
        return prev + 1;
      });
    } else {
      if (item.answer_type === "input") {
        if (item.type === "weight") {
          if (
            answers?.weight?.length > 0 &&
            !(Number(answers.weight) >= 38 && Number(answers.weight) <= 180)
          ) {
            setError(`Please enter a number between 38 and 180`);
          } else {
            setError(`Please enter your weight`);
          }
        } else if (item.type === "height") {
          if (
            answers?.height?.length > 0 &&
            !(Number(answers.height) >= 150 && Number(answers.height) <= 199)
          ) {
            setError(`Please enter a number between 150 and 199`);
          } else {
            setError(`Please enter your height`);
          }
        } else {
          setError(`Please enter your name`);
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
  useEffect(() => {
    if (value === quesAnswArr.length - 1) {
      handleSubmit();
    }
  }, [Object.keys(answers)?.length]);

  const handleSubmit = () => {
    if (answers.medicalHistory !== undefined && !isSubmitActive) {
      setIsSubmitActive(true);
      const convertLowerCaseObj = Object.keys(answers).reduce((acc, key) => {
        acc[key] =
          typeof answers[key] === "string"
            ? answers[key].toLowerCase()
            : answers[key];
        return acc;
      }, {});
      dispatch(addUserAnswerRequest(convertLowerCaseObj));
      navigate("/recipe");
    } else {
      setError(`Please select your medical history`);
    }
  };

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [value]);

  const handleKeyPress = (e) => {
    let obj = quesAnswArr[valueRef.current];
    if (obj?.option_type === "list" && obj?.answer_type === null) {
      let index = -1;
      switch (e.key) {
        case "a":
          index = 0;
          break;
        case "b":
          index = 1;
          break;
        case "c":
          index = 2;
          break;
        case "d":
          index = 3;
          break;
        case "e":
          index = 4;
          break;
        case "f":
          index = 5;
          break;
        case "g":
          index = 6;
          break;
        default:
          if (e.code !== "Enter") {
            setError("Invalid key pressed");
          }
          return;
      }
      if (index !== -1 && index < obj.answers.length) {
        const answer = obj.answers[index];
        onHandleAnswers(obj.type, answer.option, null, valueRef.current, index);
      }
    }
  };

  useEffect(() => {
    if (myRef?.current) {
      if (value !== 0 || value !== 5 || value !== 6) {
        setTimeout(() => {
          myRef.current.focus();
        });
      } else {
        myRef.current.blur();
      }
    }
  }, [value]);

  const handleClick2 = (e, isInput, questionIndex) => {
    if (e.key === "Enter") {
      if (questionIndex === 0 || questionIndex === 5 || questionIndex === 6)
        handleNextButton(quesAnswArr[value]);
    }
  };

  const handleClick1 = (e, type) => {
    if (e.key === "Enter") {
      if (valueRef.current === 7) {
        handleSubmit();
      } else {
        handleNextButton(quesAnswArr[value]);
      }
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
                        <div className="slider-content animate__backInUp animate__animated">
                          <h5 className="steps">{`Step 0${
                            questionIndex + 1
                          }`}</h5>
                          <h2>{item.question}</h2>
                          <>
                            {item?.description?.map((des) => {
                              return (
                                <h6 className="description">
                                  {des}
                                  <br />
                                </h6>
                              );
                            })}
                          </>
                          <div>
                            {item?.answer_type === "input" && (
                              <input
                                autoFocus
                                type={item.type === "name" ? "text" : "number"}
                                onKeyDown={(e) => handleClick2(e, true, value)}
                                className="answer-input"
                                placeholder="Type your answer here..."
                                value={
                                  item?.type === "name"
                                    ? answers?.name
                                    : item?.type === "weight"
                                    ? answers.weight
                                    : answers?.height
                                }
                                onChange={(e) => {
                                  let value1 = e.target.value;
                                  onHandleAnswers(
                                    item.type,
                                    value1,
                                    item?.answer_type,
                                    null,
                                    null,
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
                            ref={myRef}
                            className="primary-solid"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              handleClick1(e, "isButton");
                            }}
                            onClick={
                              value === quesAnswArr.length - 1
                                ? () => {
                                    handleSubmit();
                                  }
                                : (e) => {
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
                      {
                        value === 2 ? (
                          <img
                            className="slider-img hot-coffee-img"
                            src={hotCoffee}
                          />
                        ) : value === 3 ? (
                          <img
                            className="slider-img hot-coffee-img"
                            src={cup}
                          />
                        ) : (
                          <img
                            className="slider-img"
                            src={item.gif ? item.gif : Fruits}
                          />
                        )
                        // <img
                        //   className="slider-img"
                        //   width="100%"
                        //   height="300"
                        //   src="https://images.pexels.com/photos/10752156/pexels-photo-10752156.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                        // />
                      }
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
