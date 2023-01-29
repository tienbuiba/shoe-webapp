import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, Divider, FormHelperText, Grid, Input, InputAdornment, InputLabel, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { apiUserForgotPassword } from 'src/services/ForgotPassword';
import * as Yup from 'yup';
import { Formik } from 'formik';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


const ForgotPassForm = ({ handleChange }) => {
  const { t } = useTranslation("translation");

  const paperStyle = { paddingTop: 20, height: '65vh', width: 430, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }
  const paperStyle2 = { paddingTop: 20, height: '35vh', width: 430, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);
  const [step, setStep] = useState(1);

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  return (
    <Grid>
      {step === 1 ? (
        <Paper style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h3>{t("Forgot password")}</h3>
            <Typography sx={{ mb: 3 }}></Typography>
          </Grid>
          <Grid sx={{ textAlign: 'center', fontSize: '12px', color: '#000', mb: 2 }}>
            <Typography align="center" sx={{ width: '400px', textAlign: 'center', fontSize: '14px', color: '#000', marginBottom: '4px', fontWeight: 500 }}>
              No Problem! Enter your email or username below and we
            </Typography>
            <Typography align="center" sx={{ textAlign: 'center', fontSize: '14px', color: '#000', marginBottom: '4px', fontWeight: 500 }}>
              will send you an email with instruction to reset your
            </Typography>
            <Typography align="center" sx={{ textAlign: 'center', fontSize: '14px', color: '#000', marginBottom: '4px', fontWeight: 500 }}>
              password.
            </Typography>
          </Grid>
          <Formik
            initialValues={{
              email: 'info@monoshoes.com',
              submit: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email(t('Must be a valid email')).max(255).required(t('Email is required')),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              try {
                setStatus({ success: false });
                setSubmitting(false);
                dispatch(openLoadingApi());
                apiUserForgotPassword(values.email).then((res) => {
                  dispatch(closeLoadingApi());
                  if (res.data.statusCode === 201) {
                    setStep(2);
                  }
                  toast.error(res.data.message, options);
                }).catch(err => {
                  dispatch(closeLoadingApi());
                  if (err.response.data.statusCode === 400) {
                    setErrorMessage(err.response.data.message);
                    toast.error(err.response.data.message, options);
                    setError(true);
                  }
                })
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
                dispatch(closeLoadingApi());
              }
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email-login">
                        {t("Email Address*")}
                      </InputLabel>
                      <Input
                        id="email-login"
                        type="email"
                        value={values.email}
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        fullWidth
                        error={Boolean(touched.email && errors.email)}
                        startAdornment={
                          <InputAdornment position="start">
                            <MailOutlineIcon />
                          </InputAdornment>
                        }
                      />
                      {touched.email && errors.email && (
                        <FormHelperText error id="standard-weight-helper-text-email-login">
                          {errors.email}
                        </FormHelperText>
                      )}
                      {/* {touched.email && error === true && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errorMessage}
                    </FormHelperText>
                  )} */}
                    </Stack>
                  </Grid>
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      sx={{ backgroundColor: 'red' }}
                      className="red_button_auth"
                    >
                      Send Reset Link
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider>
                    </Divider>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
          <Grid sx={{ pt: 3 }}>
            <p style={{ paddingTop: 1, color: '#1e1e27' }}>
              {t("Back to")}
              <span style={{ paddingTop: 1, color: '#1e1e27', marginLeft: 6 }}>
                <Link to="/login" >
                  {t("Sign In")}
                </Link>
              </span>
            </p>
            <p style={{ paddingTop: 1, color: '#1e1e27' }} >
              {t("Do you have an account ?")}
              <span style={{ paddingTop: 1, color: '#1e1e27', marginLeft: 6 }}>
                <Link to="/login">
                  {t("Sign Up")}
                </Link>
              </span>
            </p>
          </Grid>
        </Paper>
      ) : (
        <>
          <Paper style={paperStyle2}>
            <Grid align='center'>
              <Avatar style={avatarStyle}>
                <TaskAltIcon color="success" sx={{ fontSize: '40px', color: '#fff' }} />
              </Avatar>
              <h3>{t("Forgot password")}</h3>
              <Typography sx={{ mb: 3 }}></Typography>
            </Grid>
            <Grid sx={{ textAlign: 'center', fontSize: '12px', color: '#000', mb: 2 }}>
              <Typography align="center" sx={{ width: '400px', textAlign: 'center', fontSize: '14px', color: '#000', marginBottom: '4px', fontWeight: 500 }}>
                If provided email is a registered email ID on Monoshoes
              </Typography>
              <Typography align="center" sx={{ textAlign: 'center', fontSize: '14px', color: '#000', marginBottom: '4px', fontWeight: 500 }}>
                you will receive an email with further instructions on how
              </Typography>
              <Typography align="center" sx={{ textAlign: 'center', fontSize: '14px', color: '#000', marginBottom: '4px', fontWeight: 500 }}>
                to reset your password. In case you didn't receive this
              </Typography>
              <Typography align="center" sx={{ textAlign: 'center', fontSize: '14px', color: '#000', marginBottom: '4px', fontWeight: 500 }}>
                email, you need to create a new account
                <Link to="/login" style={{ marginLeft: '8px' }}>
                  here
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                href="/login"
                variant="contained"
                sx={{ backgroundColor: 'red' }}
                className="red_button_auth"
              >
                Log In
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider>
              </Divider>
            </Grid>
          </Paper>
        </>
      )}
      <ToastContainer></ToastContainer>
    </Grid>
  )
}
export default ForgotPassForm
