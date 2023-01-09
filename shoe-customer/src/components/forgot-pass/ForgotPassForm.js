import React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Grid, Link, Paper, Typography } from '@mui/material';
import AuthForgotPass from './AuthForgotPass';

const ForgotPassForm = ({ handleChange }) => {
  const paperStyle = { paddingTop: 20, height: '65vh', width: 430, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }
  const avatarStyle = { backgroundColor: '#1bbd7e' }

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Forgot password</h2>
          <Typography sx={{ mb: 6 }}></Typography>
        </Grid>
        <AuthForgotPass />
        <Grid sx={{ pt: 3 }}>
          <p style={{ paddingTop: 1, color: '#1e1e27' }}>
            Back to
            <span style={{ paddingTop: 1, color: '#1e1e27', marginLeft: 6 }}>
              <Link href="/login" >
                Sign In
              </Link>
            </span>
          </p>
          <p style={{ paddingTop: 1, color: '#1e1e27' }} > Do you have an account ?
            <span style={{ paddingTop: 1, color: '#1e1e27', marginLeft: 6 }}>
              <Link href="/login" onClick={() => handleChange("event", 1)}>
                Sign Up
              </Link>
            </span>
          </p>
        </Grid>
      </Paper>
    </Grid>
  )
}
export default ForgotPassForm
