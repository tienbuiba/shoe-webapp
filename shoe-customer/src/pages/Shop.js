import React from 'react';
import Header from 'src/layouts/Header';
import { Breadcrumbs, Grid } from "@mui/material";
import Link from '@mui/material/Link';
import Page from 'src/components/Page';
import MainProduct from 'src/components/shop/MainProduct';
import Footer from 'src/layouts/Footer';
import { useTranslation } from 'react-i18next';
import MainCategory from 'src/components/shop/MainCategory';
import { Container } from '@mui/system';
import useResponsive from 'src/hooks/useResponsive';

const Shop = () => {
  const { t } = useTranslation("translation");
  const smUp = useResponsive('up', 'sm');

  return (
    <Page title={t("Shop")}
    >
      <Header />
      {!smUp ? <div className="newsletter" style={{ marginTop: '75px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>
                  {t("Shop")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div> :
        <div className="newsletter" style={{ marginTop: '150px' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                  <h3>
                    {t("Shop")}
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
                      href="/shop"
                    >
                      {t("Shop")}
                    </Link>
                  </Breadcrumbs>
                </div>
              </div>
            </div>
          </div>
        </div>}

      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Grid container  >
          <Grid item xs={12} md={3}>
            <MainCategory />
          </Grid>
          <Grid item xs={12} md={9}>
            <MainProduct />
          </Grid>
        </Grid>
      </Container>
      <div style={{ marginBottom: '100px' }}></div>
      <Footer />
    </Page>
  );
};

export default Shop;