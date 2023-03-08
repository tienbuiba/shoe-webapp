import React, { useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import Header from 'src/layouts/Header';
import Login from 'src/components/authentication/Login';
import Register from 'src/components/authentication/Register';
import Footer from 'src/layouts/Footer';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { changeLoginPage } from 'src/redux/creates-action/AuthenAction';
import { useDispatch } from 'react-redux';
import useResponsive from 'src/hooks/useResponsive';

const SignInOutContainer = () => {
  const { t } = useTranslation("translation");
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const smUp = useResponsive('up', 'sm');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(changeLoginPage(null));
  })

  const paperStyle = { width: 470, margin: "200px auto 150px" }
  const paperStyle2 = { width: 320, margin: "150px auto 100px" }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        style={{ color: 'red' }}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  return (

    <>
      {!smUp ? 
        <div>
      <Header />
      <Paper elevation={20} style={paperStyle2}>
        <Tabs
          value={value}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#fe4c50"
            }
          }}
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label={t("Sign In")} sx={{
            "&.Mui-selected": {
              color: '#fe4c50'

            }
          }} />
          <Tab label={t("Sign Up")} sx={{
            "&.Mui-selected": {
              color: '#fe4c50'
            }
          }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register handleChange={handleChange}/>
        </TabPanel>
      </Paper>
      <Footer />
    </div>:
        <div>
      <Header />
      <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#fe4c50"
            }
          }}
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label={t("Sign In")} sx={{
            "&.Mui-selected": {
              color: '#fe4c50'

            }
          }} />
          <Tab label={t("Sign Up")} sx={{
            "&.Mui-selected": {
              color: '#fe4c50'
            }
          }} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register handleChange={handleChange}/>
        </TabPanel>
      </Paper>
      <Footer />
    </div>
      }
    </>

  )
}

export default SignInOutContainer;