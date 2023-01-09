// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppWidgetSummary from 'src/sections/@dashboard/app/AppWidgetSummary';
import { AppCurrentVisits, AppWebsiteVisits } from 'src/sections/@dashboard/app';
import { apiAdminGetCalculateRevenue, apiAdminGetCountNewOrders, apiAdminGetCountNewTransactions, apiAdminGetCountNewUsers } from 'src/services/Dashboard';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [days, setDays] = useState(1);
  const [users, setUsers] = useState();
  const [transactions, setTransaction] = useState();
  const [orders, setOrders] = useState();
  const [revenue, setRevenue] = useState();
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setDays(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])

  // useEffect(() => {
  //   apiAdminGetCountNewUsers(days).then(result => {
  //     setUsers(result.data.data.count);
  //   }).catch(err => {
  //   })
  //   apiAdminGetCountNewTransactions(days).then(result => {
  //     setTransaction(result.data.data.count);
  //   }).catch(err => {
  //   })
  //   apiAdminGetCountNewOrders(days).then(result => {
  //     setOrders(result.data.data.count);
  //   }).catch(err => {
  //   })
  //   apiAdminGetCalculateRevenue(days).then(result => {
  //     setRevenue(result.data.data.revenue);
  //   }).catch(err => {
  //   })
  // }, [days]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }}>
        Welcome back Admin!
        </Typography>
        <Grid container sx={{ mb: 4 }}>
          <Grid item xs={10}>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={days}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Yesterday</MenuItem>
                  <MenuItem value={7}>This week</MenuItem>
                  <MenuItem value={30}>This month</MenuItem>
                  <MenuItem value={90}>This quarter</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New customers" total={users} icon={'ant-design:user-add-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New orders" total={orders} color="error" icon={'icon-park-outline:transaction-order'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New transaction" total={transactions} color="info" icon={'ant-design:transaction-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total revenue" total={revenue} color="warning" icon={'dashicons:money-alt'} />
          </Grid>
          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}

