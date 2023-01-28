import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Button,
    Divider,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Stack,
    Typography,
    Input
} from '@mui/material';

import * as Yup from 'yup';
import { Formik } from 'formik';
import FirebaseSocial from './FirebaseSocial';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';
import { apiUserLogin, apiUserProfile } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TokenService from 'src/services/TokenService';
import { useTranslation } from 'react-i18next';


// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
    const { t } = useTranslation("translation");
    const [showPassword, setShowPassword] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const options = {
        autoClose: 2000,
        position: toast.POSITION.TOP_RIGHT,
    };
    return (
        <>
        
            <Formik
                initialValues={{
                    email: 'info@monoshoes.com',
                    password: '123456',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email(t('Must be a valid email')).max(255).required(t('Email is required')),
                    password: Yup.string().max(255).required(t('Password is required'))
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        dispatch(openLoadingApi());
                        apiUserLogin(values.email, values.password)
                            .then(result => {
                                let res = result.data;
                                if (res.statusCode === 201) {
                                    TokenService.updateLocalAccessToken(`Bearer ${res.data.accessToken}`);
                                    TokenService.updateLocalExpiresIn(res.data.expiresIn);
                                    dispatch(closeLoadingApi());
                                    apiUserProfile().then(result => {
                                        TokenService.updateLocalProfile(JSON.stringify(result.data));
                                        navigate('/', { replace: true });
                                        toast.success(res.message, options);
                                    }).then(error => {
                                        console.log(error);
                                        dispatch(closeLoadingApi());
                                    })
                                }
                            }).catch(err => {
                                dispatch(closeLoadingApi());
                                if (err.response.data.statusCode === 401) {
                                    toast.error(err.response.data.message, options);
                                } else if (err.response.data.statusCode === 400) {
                                    toast.error(err.response.data.message[0].message, options);
                                } else {
                                    toast.error(err.response.data.message, options);
                                }
                            })
                    } catch (err) {
                        setStatus({ success: false });
                        setErrors({ submit: err.message });
                        setSubmitting(false);
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
                                                <MailOutlineIcon size="small" />
                                            </InputAdornment>
                                        }
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text-email-login">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-login">
                                        {t("Password")}
                                    </InputLabel>
                                    <Input
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LockOutlinedIcon size="small" />
                                            </InputAdornment>
                                        }
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
                                        placeholder="Enter password"
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="standard-weight-helper-text-password-login">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    className="red_button_auth"
                                >
                                    {t("Sign In")}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">
                                        {t("Sign in with")}
                                    </Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <ToastContainer />
        </>
    );
};

export default AuthLogin;
