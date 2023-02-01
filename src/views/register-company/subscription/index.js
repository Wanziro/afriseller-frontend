import { CCol, CRow } from "@coreui/react";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";
import { currencyFormatter, errorHandler, toastMessage } from "src/helpers";

function SubScription({
  setActiveStep,
  selectedPlanId,
  setSelectedPlanId,
  plans,
  setPlans,
}) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    setIsLoading(true);
    axios
      .get(BACKEND_URL + "/plans")
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setPlans(res.data.plans);
          if (selectedPlanId === "" && res.data.plans.length > 0) {
            setSelectedPlanId(res.data.plans[0].id);
          }
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          errorHandler(error);
        }, 1000);
      });
  };
  return (
    <>
      {isLoading && plans.length === 0 ? (
        <>
          <RowsPlaceHolder />
        </>
      ) : (
        <>
          <div className="mb-3">
            <CRow>
              {plans.map((item, index) => (
                <CCol md={4} key={index} className="plancard">
                  <div
                    className={
                      item.id === selectedPlanId ? "shadow active" : "shadow"
                    }
                    onClick={() => setSelectedPlanId(item.id)}
                  >
                    <h3>{item.name}</h3>
                    <ul>
                      <li>
                        <span>Duration</span>
                        <span>{item.months} Month(s)</span>
                      </li>
                      <li>
                        <span>Price</span>
                        <span>{currencyFormatter(item.fees)} RWF</span>
                      </li>
                    </ul>
                  </div>
                </CCol>
              ))}
            </CRow>
          </div>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mt: 3, ml: 1 }}
              disabled={selectedPlanId === ""}
              color="primary"
              onClick={() =>
                selectedPlanId === ""
                  ? toastMessage("info", "Please choose a plan")
                  : setActiveStep(1)
              }
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </>
  );
}

export default SubScription;
