import React, { useState } from 'react';
import { Paper } from '@mui/material';
import Header from 'src/layouts/Header';
import Footer from 'src/layouts/Footer';
import ForgotPassForm from 'src/components/forgot-pass/ForgotPassForm';

const ForgotPassword = () => {

  const paperStyle = { width: 470, margin: "200px auto 200px" };
  
  return (
    <div>
      <Header />
      <Paper elevation={20} style={paperStyle}>
        <ForgotPassForm />
      </Paper>
      <Footer />
    </div>
  )
}

export default ForgotPassword;