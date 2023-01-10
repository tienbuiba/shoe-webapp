import { Breadcrumbs, Container, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Page from 'src/components/Page';
import { ProfileDetails } from 'src/components/profile/ProfileDetails';
import Footer from 'src/layouts/Footer';
import Header from 'src/layouts/Header';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const { t } = useTranslation("translation");

  return (
    <Page>
      <Header />
      <div className="newsletter" style={{ marginTop: '150px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                <h3>
                  {t("Account")}
                </h3>
                <Breadcrumbs aria-label="breadcrumb" >
                  <Link
                    underline="hover"
                    color="inherit"
                    to="/"
                  >
                    {t("HOME PAGE")}
                  </Link>
                  <p>
                    {t("ACCOUNT")}
                  </p>
                </Breadcrumbs>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container maxWidth="lg" sx={{ mt: '50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProfileDetails ></ProfileDetails>
          </Grid>
          <Grid item xs={12} sx={{ mb: 5 }}>
            <ChangePassword />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Page>
  );
};

export default Profile;