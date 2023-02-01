import { CSpinner } from "@coreui/react";
import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import CirclePlaceHolder from "src/components/placeholders/circle";

function Confrimation({
  state,
  plans,
  selectedPlanId,
  setActiveStep,
  isSubmittingCompany,
  handleSubmit,
}) {
  const [planName, setPlanName] = useState("");
  useEffect(() => {
    const pl = plans.find((item) => item.id == selectedPlanId);
    if (pl) {
      setPlanName(pl.name);
    }
  }, [selectedPlanId]);
  return (
    <div className="companyConfirmation">
      <ul>
        <li>
          <span>Selected Plan</span>
          <span>{planName}</span>
        </li>
        <li>
          <span>Company Name</span>
          <span>{state.cmpFullName}</span>
        </li>
        <li>
          <span>Short Name</span>
          <span>{state.cmpShortName}</span>
        </li>
        <li>
          <span>TIN Number</span>
          <span>{state.cmpTinNumber}</span>
        </li>
        <li>
          <span>Phone</span>
          <span>{state.cmpPhone}</span>
        </li>
        <li>
          <span>Email</span>
          <span>{state.cmpEmail}</span>
        </li>
        <li>
          <span>Type</span>
          <span>{state.cmpType}</span>
        </li>
        <li>
          <span>Biograph</span>
          <span>{state.cmpBiograph}</span>
        </li>
      </ul>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button onClick={() => setActiveStep(1)} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          disabled={isSubmittingCompany}
          color="primary"
          //   onClick={!isError() ? handleNext : () => null}
          onClick={() => handleSubmit()}
        >
          {isSubmittingCompany ? (
            <>
              <CSpinner size="sm" /> Submitting...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </div>
  );
}

export default Confrimation;
