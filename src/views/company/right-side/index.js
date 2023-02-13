import React from "react";
import ActiveQuizes from "./active-quizes";
import PastQuizes from "./past-quizes";

function RightSide({ company }) {
  return (
    <>
      <ActiveQuizes company={company} />
      <PastQuizes company={company} />
    </>
  );
}

export default RightSide;
