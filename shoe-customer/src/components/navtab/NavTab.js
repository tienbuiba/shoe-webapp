import React, { useState } from 'react';
import { Box, Paper, Tab, Tabs, Typography } from '@mui/material';
import ProductMen from '../shop/ProductMen';
import ProductWomen from '../shop/ProductWomen';
import ProductMain from '../shop/ProductMain';
import useResponsive from 'src/hooks/useResponsive';


const NavTab = () => {
  const [value, setValue] = useState(1);
  const smUp = useResponsive('up', 'sm');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle = { width: 460, margin: "50px auto 10px" }
  const paperStyle2 = { width: 200, margin: "1px auto 10px" }

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

    <>
      {!smUp ?
        <div>
          <div elevation={20} style={paperStyle2}>
            <Tabs
              value={value}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#fe4c50"
                }
              }}
              variant="fullWidth"
            >
            </Tabs>
          </div>
          <TabPanel value={value} index={1}>
            <ProductMen />
          </TabPanel>
        </div>
        :
        <div>
          <Paper elevation={20} style={paperStyle} sx={{ borderRadius: '20px !important' }}>
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
              <Tab label="women's" sx={{
                "&.Mui-selected": {
                  color: '#fe4c50',
                }
              }} />
              <Tab label="accessories's" sx={{
                "&.Mui-selected": {
                  color: '#fe4c50',
                }
              }} />
              <Tab label="men's" sx={{
                "&.Mui-selected": {
                  color: '#fe4c50',
                }
              }} />
            </Tabs>
          </Paper>
          <TabPanel value={value} index={0}>
            <ProductMen />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ProductMain />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProductWomen />
          </TabPanel>
        </div>
      }
    </>

  )
}

export default NavTab;