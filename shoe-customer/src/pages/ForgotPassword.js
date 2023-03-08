import React from 'react';
import { Paper } from '@mui/material';
import Header from 'src/layouts/Header';
import Footer from 'src/layouts/Footer';
import ForgotPassForm from 'src/components/forgot-pass/ForgotPassForm';
import useResponsive from 'src/hooks/useResponsive';

const ForgotPassword = () => {

  const paperStyle = { width: 470, height: '500px', margin: "200px auto 200px" };
  const paperStyle2 = { paddingTop: 20, width: 320, height: '500px',margin: "200px auto 200px"  }
  const smUp = useResponsive('up', 'sm');


  return (
    <>
      {!smUp ?
        <div>
          <Header />
          <Paper elevation={20} style={paperStyle2}>
            <ForgotPassForm />
          </Paper>
          <Footer />
        </div> :
        <div>
          <Header />
          <Paper elevation={20} style={paperStyle}>
            <ForgotPassForm />
          </Paper>
          <Footer />
        </div>}
    </>
  )
}

export default ForgotPassword;