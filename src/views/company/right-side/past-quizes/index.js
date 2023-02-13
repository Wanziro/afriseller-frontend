import axios from "axios";
import React, { useEffect, useState } from "react";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";
import { errorHandler } from "src/helpers";

function PastQuizes({ company }) {
  const [quizes, setQuizes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchQuizes = () => {
    if (company?.companyId) {
      setIsLoading(true);
      axios
        .get(BACKEND_URL + "/quizes/past/" + company.companyId)
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
  return (
    <div className="companyContentsCard">
      <h3>Past Quizes</h3>
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
                {item.qFromDate} {item.qFromTime}
              </small>
            </div>
          ))}
        </>
      ) : (
        <small>No quiz found</small>
      )}
    </div>
  );
}

export default PastQuizes;
