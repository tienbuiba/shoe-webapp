
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';

const Footer = () => {
  const { t } = useTranslation("translation");
  const navigate = useNavigate();
  const smUp = useResponsive('up', 'sm');

  return (
    <div className="MainDiv">
      <footer className="footer"
        style={{ backgroundColor: '#333', color: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer_nav_container ">
                <h6 style={{ color: '#fff', marginBottom: '30px' }}>
                  {t("CONTACT")}
                </h6>
              </div>
              <p style={{ color: '#fff', marginBottom: '50px' }}>
                {t("We specialize in providing good quality genuine products that meet international standards")}
              </p>
              <div className="footer_social d-flex flex-row align-items-center justify-content-lg-start justify-content-center">
                <ul>
                  <li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                  <li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                  <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                  <li><a href="#"><i className="fa fa-skype" aria-hidden="true"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer_nav_container">
                <h6 style={{ color: '#fff', marginBottom: '30px' }}>
                  {t("CUSTOMER SUPPORT")}
                </h6>
              </div>
              <div className="text-center">
                <ul className="footer_nav">
                  <li><a href="#">
                    {t("News")}
                  </a></li>
                  <li><a href="#">
                    {t("FAQs")}
                  </a></li>
                  <li><a href="#">
                    {t("Check order")}
                  </a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer_nav_container">
                <h6 style={{ color: '#fff', marginBottom: '30px' }}>
                  {t("STORE INFORMATION")}
                </h6>
              </div>
              <div className="text-center">
                <ul className="footer_nav">
                  <li><a href="#">
                    {t("Store Address: 319 - C16 Ly Thuong Kiet, Ward 15, District 11, HCMC")}
                  </a></li>
                  <li><a href="#">
                    {t("Call Us: +84-456-7898")}
                  </a></li>
                  <li><a href="#">
                    {t("Email Us: Support@mono.Com")}
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="footer_nav_container">
                <div className="cr">©2023 All Rights Reserverd.</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default Footer;