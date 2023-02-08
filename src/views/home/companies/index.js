import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CContainer,
} from "@coreui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActiveCompanies } from "src/actions/activeCompanies";
import RowsPlaceHolder from "src/components/placeholders/rows";
import { BACKEND_URL } from "src/constants/app";

function Companies() {
  const dispatch = useDispatch();
  const { companies, isLoading } = useSelector(
    (state) => state.activeCompanies
  );

  useEffect(() => {
    dispatch(fetchActiveCompanies());
  }, []);
  return (
    <div className="companies-container">
      <CContainer>
        <h2 className="text-center mb-5">Registered Companies</h2>
        <div>
          {isLoading ? (
            <RowsPlaceHolder />
          ) : (
            <Carousel
              additionalTransfrom={0}
              arrows
              autoPlaySpeed={3000}
              centerMode={false}
              className=""
              containerClass="container"
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite={false}
              itemClass=""
              keyBoardControl
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={false}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 3,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 464,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 464,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              shouldResetAutoplay
              showDots={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
            >
              {companies.map((item, index) => (
                <CCard style={{ width: "18rem" }} key={index}>
                  <CCardImage
                    orientation="top"
                    src="https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                  />
                  <CCardBody>
                    <CCardTitle>{item.cmpFullName}</CCardTitle>
                    <CCardText>{item.cmpBiograph}</CCardText>
                    <Link to={"/company/" + item.companyId}>
                      <CButton>View More</CButton>
                    </Link>
                  </CCardBody>
                </CCard>
              ))}
            </Carousel>
          )}
        </div>
      </CContainer>
    </div>
  );
}

export default Companies;
