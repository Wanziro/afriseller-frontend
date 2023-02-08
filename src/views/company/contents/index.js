import React from "react";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { FILE_URL } from "src/constants/app";

function Contents({ isLoadingContents, activeTab, services }) {
  return (
    <>
      {isLoadingContents ? (
        <RowsPlaceHolder />
      ) : (
        <>
          {activeTab === "timeLine" &&
            services.map((item, position) => (
              <div className="companyContentsCard" key={position}>
                <img src={FILE_URL + item.image} style={{ width: "100%" }} />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
        </>
      )}
    </>
  );
}

export default Contents;
