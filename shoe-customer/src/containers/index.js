import React, { useState } from 'react';
import { Box, Breadcrumbs, Paper, Tab, Tabs, Typography } from '@mui/material';
import Header from 'src/layouts/Header';
import Login from 'src/components/authentication/Login';
import Register from 'src/components/authentication/Register';
import Footer from 'src/layouts/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SignInOutContainer = () => {
  const { t } = useTranslation("translation");
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = { width: 470, margin: "200px auto 200px" }
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
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
    <div>
      <Header />
      <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label={t("Sign In")} />
          <Tab label={t("Sign Up")} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Register />
        </TabPanel>
      </Paper>
      <Footer />
    </div>
  )
}

export default SignInOutContainer;