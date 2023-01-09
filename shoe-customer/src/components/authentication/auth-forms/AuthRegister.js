import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import {
    Button,
    Divider,
    FormHelperText,
    Grid,
    Link,
    IconButton,
    InputAdornment,
    InputLabel,
    Stack,
    Typography,
    Input
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import FirebaseSocial from './FirebaseSocial';
import { useDispatch } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { apiUserRegister } from 'src/services/Authenticate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
    const { t } = useTranslation("translation");
    const [showPassword, setShowPassword] = useState(false);
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
        <Grid sx={{ mt: 3 }}>
            <Formik
                initialValues={{
                    username: '',
                    phone: '',
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().max(255).required(t('User name is required')),
                    phone: Yup.string().required(t('Phone is required')),
                    email: Yup.string().email(t('Must be a valid email')).max(255).required(t('Email is required')),
                    password: Yup.string().max(255).required(t('Password is required'))
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        setStatus({ success: false });
                        setSubmitting(false);
                        if (true) {
                            dispatch(openLoadingApi());
                            apiUserRegister(values.username, values.password, values.email, values.phone).then(result => {
                                const res = result.data;
                                if (res.statusCode === 201) {
                                    dispatch(closeLoadingApi());
                                    toast.success(res.message, options)
                                    setTimeout(() => {
                                        navigate('/login', { replace: true });
                                    }, 2500)
                                }
                            })
                                .catch(err => {
                                    dispatch(closeLoadingApi());
                                    if (err.response.data.statusCode === 401) {
                                        toast.error(err.response.data.message, options);
                                    } else if (err.response.data.statusCode === 400) {
                                        toast.error(err.response.data.message, options);
                                    } else {
                                        toast.error(err.response.data.message, options);
                                    }
                                })
                        }

                    } catch (err) {
                        console.error(err);
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
                                    <InputLabel htmlFor="username-signup">
                                        {t("User name")}
                                    </InputLabel>
                                    <Input
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(touched.username && errors.username)}
                                        id="username-signup"
                                        type={'text'}
                                        value={values.username}
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        placeholder="NguyenvanA"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AccountCircleOutlinedIcon size="small" />
                                            </InputAdornment>
                                        }
                                    />
                                    {touched.username && errors.username && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.username}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="phone-signup">
                                        {t("Phone Number")}
                                    </InputLabel>
                                    <Input
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(touched.phone && errors.phone)}
                                        id="phone-signup"
                                        type={'text'}
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        placeholder="098654***"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <ContactPhoneOutlinedIcon size="small" />
                                            </InputAdornment>
                                        }
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup">
                                        {t("Email Address*")}
                                    </InputLabel>
                                    <Input
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@company.com"
                                        inputProps={{}}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <MailOutlineIcon size="small" />
                                            </InputAdornment>
                                        }
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="helper-text-email-signup">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="password-signup">
                                        {t("Password")}
                                    </InputLabel>
                                    <Input
                                        fullWidth
                                        variant="standard"
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
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
                                                >
                                                    {showPassword ? <VisibilityOff size="small" /> : <Visibility size="small" />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="********"
                                        inputProps={{}}
                                    />
                                    {touched.password && errors.password && (
                                        <FormHelperText error id="helper-text-password-signup">
                                            {errors.password}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    {t("By Signing up, you agree to our")}
                                    &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        {t("Terms of Service")}
                                    </Link>
                                    &nbsp; and &nbsp;
                                    <Link variant="subtitle2" component={RouterLink} to="#">
                                        {t("Privacy Policy")}
                                    </Link>
                                </Typography>
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
                                    className="red_button_auth"
                                >
                                    {t("Create Account")}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption">
                                        {t("Sign up with")}
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
        </Grid>
    );
};

export default AuthRegister;
