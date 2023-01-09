import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Grid, Link, Paper, Typography } from '@mui/material';
import AuthLogin from './auth-forms/AuthLogin';

const Login = ({ handleChange }) => {
    const paperStyle = { paddingTop: 20, height: '75vh', width: 430, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <h2>Sign In</h2>
                    <Typography sx={{ mb: 3 }}></Typography>
                </Grid>
                <AuthLogin />
                <Grid sx={{ pt: 3 }}>
                    <p style={{color: '#1e1e27' }}>
                        <span style={{ color: '#1e1e27' }}>
                            <Link href="/forgot-password">
                                Forgot password ?
                            </Link>
                        </span>
                    </p>
                    <p style={{color: '#1e1e27' }}>Do you have an account ?
                        <span style={{ color: '#1e1e27', marginLeft: 6}}>
                            <Link href="#" onClick={() => handleChange("event", 1)}>
                                Sign Up
                            </Link>
                        </span>
                    </p>
                </Grid>
            </Paper>
        </Grid>
    )
}
export default Login
