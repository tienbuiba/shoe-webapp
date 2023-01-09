import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiUserResetPassword } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';

// ============================|| CHANGE PASSWORD ||============================ //

const ResetPassword = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  return (
    <>
      <Grid container >
        <Grid item xs={4}></Grid>
        <Grid container item xs={4}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" sx={{ mb: 4, marginTop: 20, textAlign: 'center' }}>
              {t("reset_01")}
            </Typography>
          </Grid>
          <Formik
            initialValues={{
              newPassword: '',
              reTypeNewPassword: '',
              submit: null
            }}
            validationSchema={Yup.object().shape({
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
              apiUserResetPassword(token, values.newPassword).then(result => {
                let res = result.data;
                toast.success(res.message, options);
                dispatch(closeLoadingApi());
                setTimeout(() => {
                  navigate('/login', { replace: true });
                }, 2500)
              })
                .catch(err => {
                  dispatch(closeLoadingApi());
                  if (err.response.data.statusCode === 401) {
                    toast.error(err.response.data.message, options);
                  } else if (err.response.data.statusCode === 400) {
                    toast.error(err.response.data.message[0].message, options);
                  } else {
                    toast.error(err.response.data.message, options);
                  }
                })
            }}
          >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3.5} sx={{ paddingLeft: 2 }}>
                  <Grid item xs={12}>
                    <Stack spacing={0.7}>
                      <InputLabel htmlFor="new-password">
                        {t("reset_02")}
                      </InputLabel>
                      <Grid item xs={12} >
                        <OutlinedInput
                          fullWidth
                          size='small'
                          autoComplete="new-password"
                          error={Boolean(touched.newPassword && errors.newPassword)}
                          id="new-password"
                          type={'password'}
                          value={values.newPassword}
                          name="newPassword"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="********"
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
                        {t("reset_03")}
                      </InputLabel>
                      <Grid item xs={12} >
                        <OutlinedInput
                          fullWidth
                          size='small'
                          autoComplete="new-password"
                          error={Boolean(touched.reTypeNewPassword && errors.reTypeNewPassword)}
                          id="reTypeNewPassword"
                          type={'password'}
                          value={values.reTypeNewPassword}
                          name="reTypeNewPassword"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          placeholder="********"
                          inputProps={{}}
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
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }} >
                  <Button
                    disableElevation
                    type="submit"
                    variant="contained"
                  >
                    {t("reset_04")}
                  </Button>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;