import React, { useEffect, useState } from "react";
import "../../scss/registerCompany.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import SubScription from "./subscription";
import CompanyInfo from "./company-info";
import Confrimation from "./confirmation";

const initialState = {
  membershipPlanId: "",
  cmpFullName: "",
  cmpShortName: "",
  cmpTinNumber: "",
  cmpPhone: "",
  cmpEmail: "",
  cmpType: "",
  cmpBiograph: "",
};
function RegisterCompany() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [state, setState] = useState(initialState);
  const labels = ["Choose Plan", "Company info", "Confirmation"];
  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <SubScription
            setActiveStep={setActiveStep}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
          />
        );
      case 1:
        return (
          <CompanyInfo
            setActiveStep={setActiveStep}
            changeHandler={changeHandler}
            state={state}
          />
        );
      case 2:
        return <Confrimation setActiveStep={setActiveStep} />;
      default:
        <div>Unknown step</div>;
    }
  };
  useEffect(() => {
    setState({ ...state, membershipPlanId: selectedPlanId });
  }, [selectedPlanId]);

  return (
    <div className="mainContainer">
      <div className="greenBg">&nbsp;</div>
      <div className="contentsContainer">
        <div className="contents shadow">
          <h2 className="text-center">Company Registration</h2>
          <div>
            <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
              {labels.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {handleSteps(activeStep)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterCompany;
