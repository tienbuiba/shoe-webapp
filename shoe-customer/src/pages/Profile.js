import { Box, Button, Grid, Typography, CardContent, Card, Avatar, Input, CardActions, Divider } from '@mui/material';
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
import { ToastContainer, toast } from 'react-toastify';
import useResponsive from 'src/hooks/useResponsive';


const Profile = () => {
  const { t } = useTranslation("translation");
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const [dataListAddress, setDataListAddress] = useState(null);
  const [images, setImages] = useState(null);
  const smUp = useResponsive('up', 'sm');

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
        toast.success(res.data.message, options);

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <div className="container" style={{ marginTop: `${!smUp ? '75px' : '200px'}`, marginBottom: `${!smUp ? '75px' : '150px'}` }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                {t("Account")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign="right" sx={{ mb: `${!smUp ? '20px' : ''}` }}>
              <Button
                component={NavLink}
                variant="contained"
                style={{ width: '200px' }}
                className="redOutlined_button_auth"
                endIcon={<ChevronRightIcon></ChevronRightIcon>}
                to="/change-password"
              >
                {t("Change Password")}
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
                      {t("Upload Avatar")}
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
      <ToastContainer />
    </Page>
  );
};

export default Profile;