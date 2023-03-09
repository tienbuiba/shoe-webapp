
import React from 'react';
import { Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import useResponsive from 'src/hooks/useResponsive';

const Footer = () => {
  const { t } = useTranslation("translation");
  const smUp = useResponsive('up', 'sm');

  return (
    <div className="MainDiv">
      <footer className="footer"
        style={{ backgroundColor: '#333', color: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="footer_nav_container">
                <h6 style={{ color: '#fff',marginBottom: `${!smUp ? '10px': '30px'}` }}>
                  {t("CONTACT")}
                </h6>
              </div>
              <p style={{ color: '#fff', marginBottom: '50px' }}>
                {t("We specialize in providing good quality genuine products that meet international standards")}
              </p>
              <div className="footer_social d-flex flex-row align-items-center justify-content-lg-start justify-content-center">
                <ul>
                  <li><a href="https://www.facebook.com/profile.php?id=100090517898794" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.facebook.com/profile.php?id=100090517898794" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.facebook.com/profile.php?id=100090517898794" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                  <li><a href="https://www.facebook.com/profile.php?id=100090517898794" target="_blank"><i className="fa fa-skype" aria-hidden="true"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer_nav_container">
                <h6 style={{ color: '#fff',marginBottom: `${!smUp ? '10px': '30px'}` }}>
                  {t("CUSTOMER SUPPORT")}
                </h6>
              </div>
              <div className="text-center">
                <ul className="footer_nav">
                  <li><Link to="/news">
                    {t("News")}
                  </Link></li>
                  <li><Link to="/shop">
                    {t("FAQs")}
                  </Link></li>
                  <li><a href="/shop">
                    {t("Products")}
                  </a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer_nav_container">
                <h6 style={{ color: '#fff', marginBottom: `${!smUp ? '10px': '30px'}`  }}>
                  {t("STORE INFORMATION")}
                </h6>
              </div>
              <div className="text-center">
                <ul className="footer_nav">
                  <li><a href="https://www.google.com/maps/dir//286+P.+Th%C3%A1i+H%C3%A0,+L%C3%A1ng+H%E1%BA%A1,+%C4%90%E1%BB%91ng+%C4%90a,+H%C3%A0+N%E1%BB%99i/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x3135ab7cb6f60a69:0x9749b3cda5436ca?sa=X&ved=2ahUKEwjNs_Gkvs_9AhWQHHAKHXPLBzQQwwV6BAgIEAM">
                    {t("Store Address: 286 Thai Ha, Trung Liet Ward, Dong Da District, HNC")}
                  </a></li>
                  <li><a href="tel:0376624470">
                    {t("Call Us: +84-376-627-470")}
                  </a></li>
                  <li><a href="mailto:buibatien2408@gmail.com">
                    {t("Email Us: Support@meshoes.info")}
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