
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Autocomplete,
  TextareaAutosize
} from '@mui/material';
import Page from '../components/Page';
import Iconify from 'src/components/Iconify';
import { apiAdminPostMailTrusted, apiGetListMailTypeTrusted } from 'src/services/Products';
import { ToastContainer, toast } from 'react-toastify';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { useDispatch } from 'react-redux';

export default function CreateMailProduct() {
  const [mailTypeTrusted, setMailTypeTrusted] = useState([]);
  const [trustedId, setTrustedId] = useState('');
  const [listMail, setListMail] = useState('');
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [])

  useEffect(() => {
    apiGetListMailTypeTrusted().then(result => {
      const res = result.data
      setMailTypeTrusted(res.data)
    })
  }, [])


  const handleChangeListMail = (e) => {
    setListMail(e.target.value)
  }

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleClick = () => {
    const lines = listMail.split("\n");
    let check = true;
    let data = [];
    for (const line of lines) {
      const values = line.split("|");
      if (values.length === 2) {
        data = [...data, {
          username: values[0],
          password: values[1]
        }]
      } else if (values.length === 3) {
        data = [...data, {
          username: values[0],
          password: values[1],
          referenceMail: values[2]
        }]
      } else {
        check = false;
        toast.error("Định dạng mail nhập vào không hợp lệ", options);
        break;
      }
    }

    if (trustedId !== '' && data !== '' && check) {
      dispatch(openLoadingApi());

      apiAdminPostMailTrusted(trustedId, data)
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

            toast.error(err.response.data.message, options);
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
          Thêm mail Trusted thủ công
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
        <Page title="Create-product">
          <Container maxWidth="md" sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid container item>
                <Grid item xs={6}>
                  Chọn
                </Grid>
                <Grid item xs={6}>
                  <Grid item xs={6}>
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={mailTypeTrusted}
                      getOptionLabel={(option) => option.name}
                      sx={{ width: 300 }}
                      onChange={(e, newValue) => {
                        setTrustedId(newValue === null ? '' : newValue.id);
                      }}
                      renderInput={(params) => <TextField {...params} label="Loại Trusted" />}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item>
                <Grid item xs={6}>
                  Danh sách Mail Trusted
                </Grid>
                <Grid item xs={6}>
                <Typography variant="h6" >Nhập Mail với định dạng như sau:</Typography>
                <Typography>username|password xuống dòng</Typography>
                  <Typography>                
                    hoặc username|password|recoverMail xuống dòng
                  </Typography>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Nhập Mail với định dạng 
                    username|password hoặc username|password|recoverMail"
                    onChange={handleChangeListMail}
                    value={listMail}
                    style={{ width: 600, height: 250, fontSize: 14, padding: 20 }}
                  />
                </Grid>
              </Grid>
              <Grid container item >
                <Grid item xs={6}>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" onClick={handleClick} startIcon={<Iconify icon="eva:plus-fill" />}>
                    Thêm
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
