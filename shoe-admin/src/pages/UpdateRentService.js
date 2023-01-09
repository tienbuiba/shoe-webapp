import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { Container, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { ToastContainer, toast } from 'react-toastify';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { apiAdminUpdateRentMailType } from 'src/services/Products';
import { useDispatch, useSelector } from 'react-redux';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';

export default function UpdateRentService() {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const data = useSelector(state => state.rent.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(data.name)
    setStatus(data.status)
    setPrice(data.price);
  }, [])
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, []);

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value)
  }

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClick = () => {
    if (price !== '' && name !== '') {
      dispatch(openLoadingApi());
      apiAdminUpdateRentMailType(data.id, parseInt(price), name, status)
        .then(result => {
          let res = result.data;
          dispatch(closeLoadingApi());
          navigate('/dashboard/rent-mail', { replace: true });
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
  }

  return (
    <Page title="Dashboard: Product">
      <Container>
        <Typography variant="h4" sx={{ mb: 10 }}>
          Cập nhật loại thuê mail
        </Typography>
        <Grid container>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/rent-mail"
              startIcon={<Iconify icon="eva:arrow-back-outline" />}
            >
              Quay lại
            </Button>
          </Grid>
        </Grid>
        <Page title="Create-product">
          <Container maxWidth="md" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid container item>
                <Grid item xs={6}>
                  Tên
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Tên..." value={name} disabled fullWidth></TextField>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  Giá
                </Grid>
                <Grid item xs={6}>
                  <TextField label="Giá..." value={price} onChange={handleChangePrice} fullWidth></TextField>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  Trạng thái
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Trạng thái"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={"DELETED"}>DELETED</MenuItem>
                      <MenuItem value={"ACTIVE"}>ACTIVE</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleClick} startIcon={<SystemUpdateAltIcon />}>
                    Sửa
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Page>
      </Container>
      <ToastContainer />
    </Page>
  );
}
