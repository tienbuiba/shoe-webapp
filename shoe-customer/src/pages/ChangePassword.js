import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  Stack,
  Typography,
  Container,
  Input,
  InputAdornment,
  IconButton,
  Breadcrumbs,
  Link
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';
import { apiUserChangePassword } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Page from 'src/components/Page';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/system';

// ============================|| CHANGE PASSWORD ||============================ //

const ChangePassword = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  return (
    <Page title={t("title_03")}>
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
        <Container sx={{ padding: 2, backgroundColor: 'white' }} maxWidth="lg">
          <Grid container>
            <Grid item xs={6}>
              <Typography
                sx={{ mb: 3 }}
                variant="h4"
              >
                {t("change_04")}
              </Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button
                sx={{ mb: 3 }}
                component={NavLink}
                variant="contained"
                style={{ width: '180px' }}
                className="redOutlined_button_auth"
                endIcon={<ChevronRightIcon></ChevronRightIcon>}
                to="/account-profile"
              >
                Account Profile
              </Button>
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              password: '',
              newPassword: '',
              reTypeNewPassword: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .required("Please provide a valid password"),
              newPassword: Yup.string()
                .required("This field is required")
                .min(8, 'Password is too short, should be at least 8 characters'),
              reTypeNewPassword: Yup.string()
                .when("newPassword", {
                  is: val => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("newPassword")],
                    "Both passwords need to be the same"
                  )
                })
            })}
            onSubmit={(values) => {
              dispatch(openLoadingApi());
              apiUserChangePassword(values.password, values.newPassword).then(result => {
                let res = result.data;
                toast.success(res.message, options);
                dispatch(closeLoadingApi());
                setTimeout(() => {
                  navigate('/', { replace: true });
                }, 2500)
              })
                .catch(err => {
                  dispatch(closeLoadingApi());
                  if (err.response.data.statusCode === 401) {
                    dispatch(closeLoadingApi());
                    toast.error(err.response.data.message, options);
                  } else if (err.response.data.statusCode === 400) {
                    dispatch(closeLoadingApi());
                    toast.error(err.response.data.message[0].message, options);
                  } else {
                    dispatch(closeLoadingApi());
                    toast.error(err.response.data.message, options);
                  }
                })
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3.5} >
                  <Grid item xs={12}>
                    <Stack spacing={0.7}>
                      <InputLabel htmlFor="password">
                        {t("change_00")}
                      </InputLabel>
                      <Grid item xs={12} sm={6} md={4}>
                        <Input
                          fullWidth
                          size='small'
                          autoComplete="current-password"
                          error={Boolean(touched.password && errors.password)}
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          placeholder="********"
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          inputProps={{}}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? <VisibilityOutlinedIcon size="small" /> : <VisibilityOffOutlinedIcon size="small" />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Grid>
                      {touched.password && errors.password && (
                        <FormHelperText error id="helper-text-password-signup">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={0.7}>
                      <InputLabel htmlFor="new-password">
                        {t("change_01")}
                      </InputLabel>
                      <Grid item xs={12} sm={6} md={4}>
                        <Input
                          fullWidth
                          size='small'
                          autoComplete="new-password"
                          error={Boolean(touched.newPassword && errors.newPassword)}
                          id="new-password"
                          type={showNewPassword ? 'text' : 'password'}
                          value={values.newPassword}
                          name="newPassword"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="********"
                          inputProps={{}}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={handleMouseDownNewPassword}
                                edge="end"
                                size="large"
                              >
                                {showNewPassword ? <VisibilityOutlinedIcon size="small" /> : <VisibilityOffOutlinedIcon size="small" />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Grid>
                      {touched.newPassword && errors.newPassword && (
                        <FormHelperText error id="helper-text-password-signup">
                          {errors.newPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack spacing={0.7}>
                      <InputLabel htmlFor="reTypeNewPassword">
                        {t("change_02")}
                      </InputLabel>
                      <Grid item xs={12} sm={6} md={4}>
                        <Input
                          fullWidth
                          size='small'
                          autoComplete="new-password"
                          error={Boolean(touched.reTypeNewPassword && errors.reTypeNewPassword)}
                          id="reTypeNewPassword"
                          type={showNewPassword ? 'text' : 'password'}
                          value={values.reTypeNewPassword}
                          name="reTypeNewPassword"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="********"
                          inputProps={{}}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={handleMouseDownNewPassword}
                                edge="end"
                                size="large"
                              >
                                {showNewPassword ? <VisibilityOutlinedIcon size="small" /> : <VisibilityOffOutlinedIcon size="small" />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </Grid>
                      {touched.reTypeNewPassword && errors.reTypeNewPassword && (
                        <FormHelperText error id="helper-text-password-signup">
                          {errors.reTypeNewPassword}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid container item xs={12} sm={4} sx={{ textAlign: 'center', mb: 3 }} >
                    <Grid item xs={6} sm={6} >
                    </Grid>
                    <Grid item xs={6} sm={6} >
                      <Button
                        disableElevation
                        type="submit"
                        variant="contained"
                        style={{ width: '120px' }}
                        className="red_button_auth"
                      >
                        {t("change_03")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
      <Footer />
      <ToastContainer />
    </Page>
  );
};

export default ChangePassword;


