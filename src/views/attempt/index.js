import { CSpinner } from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Confirmation from "src/components/confirmation";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler, toastMessage } from "src/helpers";
import "../../scss/attempt.scss";

function Attempt() {
  const { token } = useSelector((state) => state.user);
  const { companyId, quizId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsSubmitting(true);
    axios
      .post(BACKEND_URL + "/quizes/attempt/finish/", {
        answers,
        companyId,
        quizId,
        token,
      })
      .then((res) => {
        setIsSubmitting(false);
        toastMessage("success", res.data.msg);
        navigate("/profile");
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  const fetchData = () => {
    setIsLoading(true);
    axios
      .post(BACKEND_URL + "/quizes/attempt/", { companyId, quizId, token })
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setQuestions(res.data.questions);
          setQuestionAnswers(res.data.questionsAnswers);
          setQuiz(res.data.quiz);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          errorHandler(error);
        }, 1000);
      });
  };

  useEffect(() => {
    fetchData();
  }, [companyId, quizId]);

  const handleNext = () => {
    const update = questionIndex + 1;
    if (update < questions.length) {
      setQuestionIndex(update);
    }
  };
  const handleBack = () => {
    const update = questionIndex - 1;
    if (update >= 0) {
      setQuestionIndex(update);
    }
  };

  const handleAnswer = (questionId, qType, answerId, checked) => {
    let newState = answers;
    let old = answers.find((item) => item.questionId == questionId);
    let index = answers.findIndex((item) => item.questionId == questionId);
    if (old) {
      if (qType === "radio") {
        old.answers = [answerId];
      } else {
        if (checked) {
          const fnd = old.answers.find((item) => item == answerId);
          if (!fnd) {
            old.answers = [...old.answers, answerId];
          }
        } else {
          old.answers = old.answers.filter((item) => item != answerId);
        }
      }
      if (index >= 0) {
        newState[index] = old;
      }
    } else {
      newState.push({ questionId, answers: [answerId] });
    }
    setAnswers(newState);
    console.log({ newState });
  };

  const handleFinish = () => {};

  return (
    <div>
      <div className="attempt-container shadow">
        {isLoading ? (
          <RowsPlaceHolder />
        ) : (
          quiz?.qId && (
            <>
              <div className="mb-4">
                <h3>
                  {quiz.qTitle} / {quiz.qTotalMarks} Marks
                </h3>
              </div>
              <hr />
              <br />
              <p>
                <b>{questions[questionIndex].qstTitle}</b>
              </p>
              {questions.map((question, positon) => (
                <div
                  key={positon}
                  className={
                    questions[questionIndex].qstId === question.qstId
                      ? ""
                      : "d-none"
                  }
                >
                  {question.qstType === "radio"
                    ? questionAnswers
                        .filter((item) => item.questionId === question.qstId)
                        .map((item, index) => (
                          <span key={index}>
                            <input
                              type="radio"
                              name={"question_" + question.qstId}
                              value={item.optId}
                              onClick={() =>
                                handleAnswer(
                                  item.questionId,
                                  question.qstType,
                                  item.optId,
                                  true
                                )
                              }
                            />{" "}
                            {item.description}{" "}
                          </span>
                        ))
                    : questionAnswers
                        .filter((item) => item.questionId === question.qstId)
                        .map((item, index) => (
                          <div key={index}>
                            <input
                              type="checkbox"
                              name={"question_" + question.qstId}
                              value={item.optId}
                              onClick={(e) =>
                                handleAnswer(
                                  item.questionId,
                                  question.qstType,
                                  item.optId,
                                  e.target.checked
                                )
                              }
                            />{" "}
                            {item.description}{" "}
                          </div>
                        ))}
                </div>
              ))}
              <br />
              <br />

              <div className="btns-container">
                <button
                  disabled={isSubmitting}
                  className="btn btn-default"
                  onClick={() => navigate("/company/" + companyId)}
                >
                  Cancel
                </button>
                {questionIndex !== 0 && (
                  <button
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleBack()}
                  >
                    Back
                  </button>
                )}
                {questionIndex === questions.length - 1 ? (
                  <button
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    type="button"
                    onClick={() => setShowAlert(true)}
                  >
                    {isSubmitting && <CSpinner size="sm" />} Finish
                  </button>
                ) : (
                  <button
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleNext()}
                  >
                    Next
                  </button>
                )}
              </div>
            </>
          )
        )}
      </div>
      {/* <Confirmation showAlert={showAlert} setShowAlert={setShowAlert} call /> */}
      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleSubmit}
        title="Do you want to finish quiz?"
      />
    </div>
  );
}

export default Attempt;
