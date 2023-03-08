import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import { useTranslation } from 'react-i18next';
import NewComponent from 'src/components/news/NewComponent';
import useResponsive from 'src/hooks/useResponsive';

const News = () => {
  const { t } = useTranslation("translation");
  const smUp = useResponsive('up', 'sm');

  return (
    <Page title="News">
      <Header />
      {!smUp ? <div className="newsletter" style={{ marginTop: '45px', marginBottom: '70px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
              </div>
            </div>
          </div>
        </div>
      </div> :
        <div className="newsletter" style={{ marginTop: '150px', marginBottom: '70px' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                  <h3>
                    {t("News")}
                  </h3>
                  <Breadcrumbs aria-label="breadcrumb" >
                    <Link
                      underline="hover"
                      color="inherit"
                      href="/"
                    >
                      {t("HOME PAGE")}
                    </Link>
                    <Link
                      underline="hover"
                      color="inherit"
                      href="/"
                    >
                      {t("News")}
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="container">
        <div className="row mb-5">
          <div className="col text-center">
            <div className="section_title">
              <h2>
                {t("News")}
              </h2>
            </div>
          </div>
        </div>
        <NewComponent />
      </div>
      <div style={{ marginBottom: '100px' }}></div>
      <Footer />
    </Page>
  );
};

export default News;