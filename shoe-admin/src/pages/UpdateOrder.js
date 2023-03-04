
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import SaveIcon from '@mui/icons-material/Save';
import { apiAdminUpdateStatusOrder } from 'src/services/Order';

export default function UpdateOrder() {
  const data = useSelector(state => state.order.data);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(data.details)

  useEffect(() => {
    setStatus(data.details.status);
  }, [])

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClick = () => {
    dispatch(openLoadingApi());
    apiAdminUpdateStatusOrder(data.details.id, "ok", status)
      .then(result => {
        console.log(result)
        let res = result.data;
        dispatch(closeLoadingApi());
        navigate('/dashboard/orders', { replace: true });
        toast.success(res.message, options);
      })
      .catch(err => {
        if (err.response.data.statusCode === 401) {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message, options);
        } else if (err.response.data.statusCode === 400) {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message[0], options);
        } else {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message, options);
        }
      })
  }

  return (
    <Page title="UpdateStateOrder">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 10 }}>
          CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
        </Typography>
        <Grid container>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="info" component={RouterLink} to="/dashboard/orders" startIcon={<Iconify icon="eva:arrow-back-outline" />}>
              Quay lại
            </Button>
          </Grid>
        </Grid>
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid container item spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="h5">
                    Mã đơn hàng:
                    {data.details.code}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Trạng thái"
                      onChange={handleChange}
                    >
                      <MenuItem value={"NOT_PAY"}>CHƯA THANH TOÁN</MenuItem>
                      <MenuItem value={"PAIED"}>ĐÃ THANH TOÁN</MenuItem>
                      <MenuItem value={"DELIVERING"}>ĐANG VẬN CHUYỂN</MenuItem>
                      <MenuItem value={"SUCCESS"}>GIAO HÀNG THÀNH CÔNG</MenuItem>
                      <MenuItem value={"CANCEL"}>HỦY</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item >
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleClick} startIcon={<SaveIcon />} color="error" sx={{ ml: 2 }}>
                    Cập Nhật
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Container>
      <ToastContainer />
    </Page>
  );
}
