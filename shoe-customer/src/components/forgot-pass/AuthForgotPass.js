import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
  Button,
  Divider,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Stack,
  Input
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { apiUserForgotPassword } from 'src/services/ForgotPassword';
import { useState } from 'react';

// ============================|| AuthForgotPass ||============================ //

const AuthForgotPass = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(false);

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleChangeEmail = () => {
    setError(false)
  }

  return (
    <>
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
            }).catch(err => {
              dispatch(closeLoadingApi());
              if (err.response.data.statusCode === 400) {
                setErrorMessage(err.response.data.message);
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
                  {error === true ? (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errorMessage}
                    </FormHelperText>
                  ) : <></>}
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
                  {t("Send request")}
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
      <ToastContainer />
    </>
  );
};

export default AuthForgotPass;
