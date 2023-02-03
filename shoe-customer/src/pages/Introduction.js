import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import { useTranslation } from 'react-i18next';

const Introduction = () => {
  const { t } = useTranslation("translation");
  return (
    <Page title="Introduction">
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>
                  {t("Introduction")}
                </h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                  >
                    {t("HOME PAGE")}
                  </Link>
                  <p>
                    {t("INTRODUCTION")}
                  </p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center mt-5">
        <h4>MONO<span style={{ color: '#fe4c50', fontSize: '24px', fontWeight: '700' }}> SHOES</span></h4>
        <p>
          {t("More personality - More stylish - More love of life")}
        </p>
      </div>
      <div className="benefit">
        <div className="container">
          <div className="row  mb-5">
            <div className="col-lg-6">
              <div className="benefit_item d-flex flex-row align-items-center">
                <div className="benefit_icon"><i className="fa fa-truck" aria-hidden="true"></i></div>
                <div className="benefit_content">
                  <h6>
                    {t("free shipping")}
                  </h6>
                  <p>
                    {t("Suffered Alteration in Some Form")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="benefit_item d-flex flex-row align-items-center">
                <div className="benefit_icon"><i className="fa fa-money" aria-hidden="true"></i></div>
                <div className="benefit_content">
                  <h6>
                    {t("cach on delivery")}
                  </h6>
                  <p>
                    {t("The Internet Tend To Repeat")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row  m-l-2">
            <div className="col-lg-6 ">
              <div className="benefit_item d-flex flex-row align-items-center">
                <div className="benefit_icon"><i className="fa fa-undo" aria-hidden="true"></i></div>
                <div className="benefit_content">
                  <h6>
                    {t("45 days return")}
                  </h6>
                  <p>
                    {t("Making it Look Like Readable")}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="benefit_item d-flex flex-row align-items-center">
                <div className="benefit_icon"><i className="fa fa-clock-o" aria-hidden="true"></i></div>
                <div className="benefit_content">
                  <h6>
                    {t("opening all week")}
                  </h6>
                  <p>
                    {t("8AM - 09PM")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: '150px' }}>
      </div>
      <Footer />
    </Page>
  );
};

export default Introduction;