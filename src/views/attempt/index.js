import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../scss/attempt.scss";

function Attempt() {
  const { companyId, quizId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = () => {};

  useEffect(() => {
    fetchData();
  }, [companyId, quizId]);
  return (
    <div>
      <div className="attempt-container shadow">testin</div>
    </div>
  );
}

export default Attempt;
