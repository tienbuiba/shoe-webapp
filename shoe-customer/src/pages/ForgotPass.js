import {
  Button,
  Card,
  Container,
  FormHelperText,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { apiUserForgotPass } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch, useSelector } from 'react-redux';

// ============================|| FORGOT PASSWORD ||============================ //

const ForgotPass = () => {
  const [sended, setSended] = useState(false);
  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };
  const { t } = useTranslation("translation");
  console.log("adadad")
  const dispatch = useDispatch();
  const data = useSelector(state => state.loading.data);
  
  return (
    <div>
      {sended === true ? (
        <>
          <Container maxWidth="sm" sx={{ mt: 20 }}>
            <Card>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ textAlign: 'center', mt:2 }}>
                  <CheckCircleIcon color="success" sx={{ textAlign: 'center', width: 90, height: 65, }} />
                </Grid>
                <Grid item xs={12} >
                  <Typography sx={{ px: 4, textAlign: 'center', }} variant="h3">
                    {t("forgot_01")}
                  </Typography>
                </Grid>
                <Grid item xs={12} >
                  <Typography sx={{ px: 5, textAlign: 'center', }}>
                    {t("forgot_02")}
                    <Link to="/register" style={{ marginRight: '10px', marginLeft: '10px' }}>
                      {t("forgot_03")}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Button href="/login" variant="contained" sx={{ textAlign: 'center', mb: 5 }} size="medium">
                    {t("forgot_04")}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </>
      ) : (<>
        <Grid container >
          <Grid item xs={12}  md={4}></Grid>
          <Grid container item xs={12}  md={4} sx={{ textAlign: 'center' }}>
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ mb: 4, marginLeft: 2, marginTop: 20, }}>
                {t("forgot_05")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Formik
                initialValues={{
                  email: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .required("This field is required")
                    .email('Please provide a valid password'),
                })}
                onSubmit={(values) => {
                  dispatch(openLoadingApi());
                  apiUserForgotPass(values.email,).then(result => {
                    dispatch(closeLoadingApi());
                    let res = result.data;
                    toast.success(res.message, options);
                    setTimeout(() => {
                      setSended(true)
                    }, 500)
                  })
                    .catch(err => {
                      dispatch(closeLoadingApi());
                      if (err.response.data.statusCode === 401) {
                        toast.error(err.response.data.message, options);
                        dispatch(closeLoadingApi());
                      } else if (err.response.data.statusCode === 400) {
                        toast.error(err.response.data.message, options);
                        dispatch(closeLoadingApi());
                      } else {
                        toast.error(err.response.data.message, options);
                        dispatch(closeLoadingApi());
                      }
                    })
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3.5} sx={{ paddingLeft: 2 }}>
                      <Grid item xs={3} >
                        <Typography sx={{ mb: 2 }}>Email</Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Stack spacing={0.7}>
                          <Grid item xs={9}>
                            <OutlinedInput
                              fullWidth
                              size='small'
                              autoComplete="current-password"
                              error={Boolean(touched.email && errors.email)}
                              id="email"
                              type={'email'}
                              value={values.email}
                              name="email"
                              onBlur={handleBlur}
                              placeholder="sale@gmailmmo.com"
                              onChange={(e) => {
                                handleChange(e)
                              }}
                            />
                          </Grid>
                          {touched.email && errors.email && (
                            <FormHelperText error id="helper-text-password-signup">
                              {errors.email}
                            </FormHelperText>
                          )}
                        </Stack>
                      </Grid>
                      {errors.submit && (
                        <Grid item xs={12}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Grid>
                      )}
                      <Grid item xs={12} sx={{textAlign: 'center', mb: 3}}>
                        <Grid item >
                          <Button
                            disableElevation
                            type="submit"
                            variant="contained"
                            endIcon={<SendIcon />}
                            disabled={data.isLoading === true ? true : false}
                          >
                            {t("forgot_06")}
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </>)}
      <ToastContainer />
    </div>
  );
};

export default ForgotPass;