// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AppWidgetSummary from 'src/sections/@dashboard/app/AppWidgetSummary';
import { AppCurrentVisits, AppWebsiteVisits } from 'src/sections/@dashboard/app';
import { apiAdminGetAllStatistic, } from 'src/services/Dashboard';
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
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setDays(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])

  useEffect(() => {
    dispatch(openLoadingApi());
    apiAdminGetAllStatistic(days).then((result) => {
      setUsers(result.data.data.newUsers);
      setTransaction(result.data.data.newTransactions);
      setOrders(result.data.data.newOrders);
      setRevenue(result.data.data.totalRevenue);
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      dispatch(closeLoadingApi());
    })

  }, [days])

  return (
    <Page title="Thống kê">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 2 }}>
          Chào mừng trở lại Quản trị viên! 
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
                  <MenuItem value={1}>Hôm qua</MenuItem>
                  <MenuItem value={7}>Tuần này</MenuItem>
                  <MenuItem value={30}>Tháng này</MenuItem>
                  <MenuItem value={90}>Qúy này</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Khách hàng mới" total={users} icon={'ant-design:user-add-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Đơn hàng mới" total={orders} color="error" icon={'icon-park-outline:transaction-order'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Giao dịch mới" total={transactions} color="info" icon={'ant-design:transaction-outlined'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng doanh thu" total={revenue} color="warning" icon={'dashicons:money-alt'} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Biểu đồ doanh thu các ngày trong tháng"
              subheader=""
              chartLabels={[
                '03/01/2023',
                '03/02/2023',
                '03/03/2023',
                '03/04/2023',
                '03/05/2023',
                '03/06/2023',
                '03/07/2023',
                '03/08/2023',
                '03/09/2023',
                '03/10/2023',
                '03/11/2023'
              ]}
              chartData={[
                {
                  name: 'Orders',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Orders',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
              ]}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Thống kê trạng thái đơn hàng"
              chartData={[
                { label: 'Hoàn tất', value: 4344 },
                { label: 'Tiếp nhận', value: 5435 },
                { label: 'Đang vận chuyển', value: 1443 },
                { label: 'Hủy bỏ', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

