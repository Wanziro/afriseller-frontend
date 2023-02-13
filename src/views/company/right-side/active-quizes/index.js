import axios from "axios";
import React, { useEffect, useState } from "react";
import Confirmation from "src/components/confirmation";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler } from "src/helpers";

function ActiveQuizes({ company }) {
  const [showAlert, setShowAlert] = useState(false);
  const [quizes, setQuizes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchQuizes = () => {
    if (company?.companyId) {
      setIsLoading(true);
      axios
        .get(BACKEND_URL + "/quizes/active/" + company.companyId)
        .then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            setQuizes(res.data.quizes);
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            errorHandler(error);
            setIsLoading(false);
          }, 1000);
        });
    }
  };
  useEffect(() => {
    fetchQuizes();
  }, [company]);

  const takeQuiz = () => {};

  return (
    <div className="companyContentsCard">
      <h3>Active Quizes</h3>
      {isLoading ? (
        <RowsPlaceHolder></RowsPlaceHolder>
      ) : quizes.length > 0 ? (
        <>
          <br />
          {quizes.map((item, index) => (
            <div
              key={index}
              style={{ borderBottom: "1px solid #CCC", marginBottom: 10 }}
            >
              <p style={{ textTransform: "capitalize", marginBottom: 5 }}>
                <b>{item.qTitle}</b>
              </p>
              <small>
                From: {item.qFromDate} {item.qFromTime}
              </small>
              <br />
              <small>
                Deadline: {item.qToDate} {item.qToTime}
              </small>
              <br />
              <div className="text-end mb-2">
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue",
                    textDecoration: "underline",
                  }}
                  onClick={() => {
                    setSelectedQuiz(item);
                    setShowAlert(true);
                  }}
                >
                  Take quiz
                </span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <small>No quiz found</small>
      )}
      <Confirmation
        title="Do you want to take this quiz? Click on confirm to take the quiz immediately."
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      />
    </div>
  );
}

export default ActiveQuizes;
