
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card
} from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { apiAdminUpdateCategory } from 'src/services/Categories';
import SaveIcon from '@mui/icons-material/Save';

export default function EditCategory() {
  const [type, setType] = useState('');
  const data = useSelector(state => state.category.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])

  useEffect(() => {
    setType(data.name);
  }, [])

  const handleChangeType = (e) => {
    setType(e.target.value);
  }

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClick = () => {
    if (type !== '') {
      dispatch(openLoadingApi());
      apiAdminUpdateCategory(data.id, type)
        .then(result => {
          let res = result.data;
          dispatch(closeLoadingApi());
          navigate('/dashboard/Categories', { replace: true });
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
    } else {
      toast.error("lack field", options);
    }
  }

  return (
    <Page title="Dashboard: Product">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 10 }}>
          CHỈNH SỬA DANH MỤC SẢN PHẨM
        </Typography>
        <Grid container>
          <Grid item xs={6}>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: 'right' }}>
            <Button variant="contained" component={RouterLink} to="/dashboard/Categories" startIcon={<Iconify icon="eva:arrow-back-outline" />}>
              Quay lại
            </Button>
          </Grid>
        </Grid>
        <Container maxWidth="lg" sx={{ mt: 3 }}>
          <Card sx={{ p: 5 }}>
            <Grid container spacing={3}>
              <Grid container item spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="h4">
                    Tên danh mục sản phẩm
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Tên"
                    value={type}
                    onChange={handleChangeType}
                  ></TextField>
                </Grid>
              </Grid>
              <Grid container item >
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleClick} startIcon={<SaveIcon />}>
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
