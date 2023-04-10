import React, { useState } from "react";
import Slider from "react-slick";
import "../../assets/style/slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { detail } from "../../utils/const";
import Fruits from "../../assets/gif/fruits.gif";
import logo from "../../assets/logo.svg";
import next from "../../assets/next.svg";
import prev from "../../assets/prev.svg";

const SlickSlider = () => {
  const [value, setValue] = useState(0);
  const [answers, setAnswers] = useState({});

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

  const onHandleAnswers = (type, option, ansType) => {
    setAnswers({ ...answers, [type]: option });
    if (ansType === "input") {
      return;
    }
    setValue((prev) => prev + 1);
  };

  console.log("====>answers", answers);

  const getAlaphabet = (index) => {
    const character = "A";
    const asciiValue = character.charCodeAt(0);
    const character1 = String.fromCharCode(asciiValue + index);

    return character1;
  };

  const handleNextButton = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <div className="container-fluid">
      <img src={logo} alt="logo" />
      <div className="slider-wraper">
        <div className="container">
          <>
            {detail.map((item, index) => {
              return (
                <div
                  className={`row align-items-center slides ${
                    value === index ? "active-slide" : ""
                  }`}
                >
                  <div className="col-md-6">
                    {value === index && (
                      <div className="slider-content animate__animated animate__backInUp">
                        <h5 className="steps">{`Step 0${index + 1}`}</h5>
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
                        {item.answers?.map((item2, index) => {
                          return (
                            <h6
                              className="options"
                              onClick={() =>
                                onHandleAnswers(item.type, item2.option)
                              }
                            >
                              <span className="option">
                                {getAlaphabet(index)}
                              </span>
                              {item2.option}
                            </h6>
                          );
                        })}

                        <button
                          className="primary-solid"
                          onClick={handleNextButton}
                        >
                          Next
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
