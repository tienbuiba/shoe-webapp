import React, { useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import MainProduct from '../shop/MainProduct';

const NavTab = () => {
  const [value, setValue] = useState(1)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = { width: 460, margin: "50px auto 10px" }
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
      <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          onChange={handleChange}
        >
          <Tab label="women's" />
          <Tab label="accessories's" />
          <Tab label="men's" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <MainProduct />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MainProduct />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MainProduct />
      </TabPanel>
    </div>
  )
}

export default NavTab;