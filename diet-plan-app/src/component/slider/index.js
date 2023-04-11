import React, { useState } from "react";
import Slider from "react-slick";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/style/slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { detail } from "../../utils/const";
import Fruits from "../../assets/gif/fruits.gif";
import logo from "../../assets/logo.svg";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";
import { addUserAnswerRequest } from "../../redux/reducer/user";
import { userAnswerValidateDetail } from "../../utils/validation";

const SlickSlider = () => {
  const [value, setValue] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quesAnswArr, setQuesAnswArr] = useState(detail);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSlidePrev = () => {
    if (value === 0) {
      return;
    }
    setValue((prev) => prev - 1);
  };
  const handleSlideNext = () => {
    if (value === 5) {
      return;
    }
    setValue((prev) => prev + 1);
  };

  const onHandleAnswers = (
    type,
    option,
    ansType,
    questionIndex,
    answerIndex,
  ) => {
    setAnswers({ ...answers, [type]: option.toLowerCase() });
    // userAnswerValidateDetail(answers);
    console.log("===>ansType", ansType);
    if (ansType === "input") {
      return;
    }
    const newQuestionsState = [...quesAnswArr];
    const newAnswers = [...newQuestionsState[questionIndex].answers];
    newAnswers.forEach((answer, index) => {
      answer.isSelected = index === answerIndex;
    });
    newQuestionsState[questionIndex].answers = newAnswers;
    if (value !== 5) {
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

  const handleNextButton = (item, type) => {
    // console.log("=====>answers", answers);
    // let check = item?.answers?.some((item) => {
    //   if (item.isSelected === false) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });

    // if (check) {
    setValue((prev) => prev + 1);
    // } else {
    //   alert(`please select ${type}`);
    // }
  };
  const handleSubmit = () => {
    // userAnswerValidateDetail(answers);
    dispatch(addUserAnswerRequest(answers));
    navigate("/recipe");
  };

  return (
    <div className="container-fluid">
      <img src={logo} alt="logo" />
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
                    <div className="col-md-6">
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
                                className="answer-input"
                                placeholder="Type your answer here..."
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
                                {item2.option}
                              </h6>
                            );
                          })}

                          <button
                            className="primary-solid"
                            onClick={
                              value === 5
                                ? handleSubmit
                                : () => handleNextButton(item, item.type)
                            }
                          >
                            {value === 5 ? "Submit" : "Next"}
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      {<img width={800} height={600} src={Fruits} />}
                    </div>
                  </div>
                );
              })}
          </>
        </div>
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
            {value === 5 ? (
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
  );
};

export default SlickSlider;
