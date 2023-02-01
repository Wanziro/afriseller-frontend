import { CSpinner } from "@coreui/react";
import React from "react";
import { APP_COLORS } from "src/constants/colors";

function CirclePlaceHolder() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CSpinner size="md" color={APP_COLORS.DARK_GREEN} />
      <p>Loading...</p>
    </div>
  );
}

export default CirclePlaceHolder;
