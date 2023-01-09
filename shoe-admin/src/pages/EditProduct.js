
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button
} from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { apiAdminUpdateMailType } from 'src/services/Products';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Label from 'src/components/Label';
import { fNumber } from 'src/utils/formatNumber';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';


export default function EditProduct() {
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const data = useSelector(state => state.product.data);
  const dispatch = useDispatch()

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }

  }, [])

  useEffect(() => {
    setPrice(data.price)
    setType(data.name)
  }, [])

  const handleChangePrice = (e) => {
    setPrice(e.target.value)
  }
  const handleChangeType = (e) => {
    setType(e.target.value)
  }

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClick = () => {
    if (price !== '' && type !== '') {
      dispatch(openLoadingApi());
      apiAdminUpdateMailType(data.id, parseInt(price), type)
        .then(result => {
          let res = result.data;
          dispatch(closeLoadingApi());
          navigate('/dashboard/products', { replace: true });
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
          Chỉnh sửa sản phẩm
        </Typography>
        <Grid container>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Button variant="contained" component={RouterLink} to="/dashboard/products" startIcon={<Iconify icon="eva:arrow-back-outline" />}>
              Quay lại
            </Button>
          </Grid>
        </Grid>
        <Page title="Edit-product">
          <Container maxWidth="md" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid container item spacing={3}>
                <Grid item xs={6}>
                  Tên sản phẩm
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Tên"
                    value={type}
                    onChange={handleChangeType}
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  Giá
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Giá..."
                    value={(price)}
                    onChange={handleChangePrice}
                  ></TextField>
                </Grid>
                <Grid item xs={6}>
                  Thời gian tồn tại
                </Grid>
                <Grid item xs={6}>
                  <Label variant="ghost" color={(data.time === -1 && 'error') || 'success'}>
                    {data.time === -1 ? 'Trusted' : data.time * 24 + ' hours'}
                  </Label>
                </Grid>
              </Grid>
              <Grid container item >
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleClick} startIcon={<Iconify icon="ic:round-update" />}>
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
