import { cibFacebook, cibInstagram, cibTwitter } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React from "react";
import "../../scss/footer.scss";
function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container bottom_border">
          <div className="row">
            <div className=" col-sm-4 col-md col-sm-4  col-12 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Find us</h5>
              <p className="mb10">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <p>
                <i className="fa fa-location-arrow"></i> 9878/25 sec 9 rohini 35{" "}
              </p>
              <p>
                <i className="fa fa-phone"></i> +91-9999878398{" "}
              </p>
              <p>
                <i className="fa fa fa-envelope"></i> info@example.com{" "}
              </p>
            </div>

            <div className=" col-sm-4 col-md  col-6 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Quick links</h5>
              <ul className="footer_ul_amrc">
                <li>
                  <a href="#">Winner story</a>
                </li>
                <li>
                  <a href="#">Jobs New Room</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className=" col-sm-4 col-md  col-6 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Help Center</h5>
              <ul className="footer_ul_amrc">
                <li>
                  <a href="#">How to create a company?</a>
                </li>
                <li>
                  <a href="#">How to do a quiz?</a>
                </li>
                <li>
                  <a href="#">Tutorials</a>
                </li>
              </ul>
            </div>

            <div className=" col-sm-4 col-md  col-12 col">
              <h5 className="headin5_amrc col_white_amrc pt2">Follow us</h5>

              <ul className="footer_ul2_amrc">
                <li>
                  <a href="#">
                    <CIcon icon={cibTwitter} /> Twitter
                  </a>
                </li>
                <li>
                  <a href="#">
                    <CIcon icon={cibInstagram} /> Instagram
                  </a>
                </li>
                <li>
                  <a href="#">
                    <CIcon icon={cibFacebook} /> Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="container">
          <ul className="foote_bottom_ul_amrc">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>

          <p className="text-center">Copyright @2023</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
