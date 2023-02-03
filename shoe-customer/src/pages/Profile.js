import { Box, Breadcrumbs, Button, Container, Grid, Typography, Link } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import Header from 'src/layouts/Header';
import AccountProfile from '../components/profile/AccountProfile';
import { AccountProfileDetails } from '../components/profile/AccountProfileDetails';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavLink } from 'react-router-dom';

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
                    href="/"
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={6}>
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                Account
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button
                component={NavLink}
                variant="contained"
                style={{ width: '180px' }}
                className="redOutlined_button_auth"
                endIcon={<ChevronRightIcon></ChevronRightIcon>}
                to="/change-password"
              >
                Change Password
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <AccountProfile />
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
        <Box></Box></Box>
      <Footer />
    </Page>
  );
};

export default Profile;