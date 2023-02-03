import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Grid, Paper, Typography } from '@mui/material';
import AuthLogin from './auth-forms/AuthLogin';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Login = ({ handleChange }) => {
    const { t } = useTranslation("translation");
    const paperStyle = { paddingTop: 20, height: '75vh', width: 430, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h3>
                        {t("Sign In")}
                    </h3>
                    <Typography sx={{ mb: 3 }}></Typography>
                </Grid>
                <AuthLogin />
                <Grid sx={{ pt: 3 }}>
                    <p style={{ color: '#1e1e27' }}>
                        <span style={{ color: '#1e1e27' }}>
                            <Link to="/forgot-password">
                                {t("Forgot password ?")}
                            </Link>
                        </span>
                    </p>
                    <p style={{ color: '#1e1e27' }}>
                        {t("Do you have an account ?")}
                        <span style={{ color: '#1e1e27', marginLeft: 6 }}>
                            <Link to="#" onClick={() => handleChange("event", 1)}>
                                {t("Sign Up")}
                            </Link>
                        </span>
                    </p>
                </Grid>
            </Paper>
        </Grid>
    )
}
export default Login
