import { Box, Breadcrumbs, Button, Container, Grid, Typography, Link, CardContent, Card, Avatar, Input, CardActions, Divider } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Page from 'src/components/Page';
import Footer from 'src/layouts/Footer';
import Header from 'src/layouts/Header';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { NavLink } from 'react-router-dom';
import TokenService from 'src/services/TokenService';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiUserGetDeliveryAddress } from 'src/services/Address';
import { uploadImage } from 'src/services/UploadImage';
import { PhotoCamera } from '@mui/icons-material';
import account from 'src/_mock/account';
import { AccountProfileDetails } from 'src/components/profile/AccountProfileDetails';


const Profile = () => {
  const { t } = useTranslation("translation");

  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const [dataListAddress, setDataListAddress] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    apiUserGetDeliveryAddress().then((res) => {
      setDataListAddress(res?.data?.data[0]);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const handleChangeProductImages = (event) => {
    let data = event.target.files[0];
    uploadImage(data)
      .then((res) => {
        setImages(res?.data?.data);

      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/account-profile"
                  >
                    {t("Account")}
                  </Link>
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
        <div className="container">
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
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {images === null ? (
                      <Avatar
                        src={profile.avatarUrl === 'default.png' ? account.photoURL : profile.avatarUrl}
                        sx={{
                          height: 64,
                          mb: 2,
                          width: 64
                        }}
                      />) : (
                        <Avatar
                          src={images}
                          sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                          }}
                        />
                      )}
                    <Typography
                      color="textPrimary"
                      gutterBottom
                      variant="h5"
                    >
                      {profile.username}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {`${dataListAddress?.city?.name} ${dataListAddress?.district?.name}`}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                    >
                      {dataListAddress?.detail}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <label htmlFor="contained-button-file-font">
                    <Input
                      accept="image/*"
                      id="contained-button-file-font"
                      multiple
                      type="file"
                      sx={{ display: 'none' }}
                      onChange={handleChangeProductImages}
                    />
                    <Button
                      variant="outlined"
                      endIcon={<PhotoCamera></PhotoCamera>}
                      size="medium"
                      component="span"
                      color="error"
                    >
                      Upload Avatar
                    </Button>
                  </label>
                </CardActions>
              </Card>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <AccountProfileDetails images={images} />
            </Grid>
          </Grid>
        </div>
        <Box></Box></Box>
      <Footer />
    </Page>
  );
};

export default Profile;