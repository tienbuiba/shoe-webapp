import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import * as Yup from 'yup';
import { useState } from 'react';
import { IconButton, InputAdornment, Grid, FormControl, OutlinedInput, FormHelperText, useMediaQuery, createTheme, Typography, Container, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUserLogin, apiUserProfile } from '../services/Authenticate';
import useResponsive from '../hooks/useResponsive';
import TokenService from '../services/TokenService';
import Page from '../components/Page';
import Logo from '../components/Logo';
import { useEffect } from 'react';
import { closeLoadingApi, openLoadingApi } from 'src/redux/create-actions/LoadingAction';
import { useDispatch } from 'react-redux';


const theme = createTheme()
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please provide a valid email"),
  password: Yup.string()
    .required("This field is required")
    .min(8, 'Password is too short, should be at least 8 characters'),
});
export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: '', password: '' },

    validationSchema: validationSchema,
    onSubmit: (values) => { handleSubmit(values) }
  });

  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const handleSubmit = (e) => {
    dispatch(openLoadingApi());
    apiUserLogin(e.email, e.password)
      .then(result => {
        let res = result.data;
        if (res.statusCode === 201) {
          dispatch(closeLoadingApi());
          TokenService.updateLocalAccessToken(`Bearer ${res.data.accessToken}`);
          TokenService.updateLocalExpiresIn(res.data.expiresIn);
          apiUserProfile().then(result => {
            TokenService.updateLocalProfile(JSON.stringify(result.data));
            dispatch(closeLoadingApi());
            navigate('/dashboard/home', { replace: true });
          }).catch(error => {
            console.log(error);
            dispatch(closeLoadingApi());
          })
          toast.success(res.message, options);
        } else {
          dispatch(closeLoadingApi());
        }
      })
      .catch(err => {
        if (err.response.data.statusCode === 401) {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message, options);
        } else if (err.response.data.statusCode === 400) {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message[0].message, options);
        } else {
          dispatch(closeLoadingApi());
          toast.error(err.response.data.message, options);
        }
      })
  };
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { replace: true });
    } else {
      navigate('/dashboard/home', { replace: true });
    }
  }, [])

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
        </HeaderStyle>
          <Container maxWidth="sm">
            <ContentStyle>
              {mdUp && (
                <>
                  <Typography variant="h3" gutterBottom >
                    Login
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 3, }}>For Administrators</Typography>
                </>
              )}
              {!smUp && (
                <>
                  <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
                    Login
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>For Administrators</Typography>
                </>
              )}
              <form onSubmit={formik.handleSubmit} noValidate>
                <Grid sx={{ mb: 2 }} >
                  <FormControl fullWidth
                    error={formik.touched.email && Boolean(formik.errors.email)}>
                    <Typography>Email *</Typography>
                    <OutlinedInput
                      id="email"
                      fullWidth
                      required
                      size={matchDownSM ? 'small' : 'large'}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      sx={{
                        '& .MuiInputBase-input': {
                          bgcolor: theme.palette.background.default
                        },
                        bgcolor: theme.palette.background.default,
                      }}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <FormHelperText error id="standard-weight-helper">
                        {formik.errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid sx={{ mb: 2 }} >
                  <FormControl fullWidth
                    error={formik.touched.password && Boolean(formik.errors.password)}>
                    <Typography>Password *</Typography>
                    <OutlinedInput
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      size={matchDownSM ? 'small' : 'large'}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={e => { setShowPassword(!showPassword) }}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{}}
                      sx={{
                        '& .MuiInputBase-input': {
                          bgcolor: theme.palette.background.default
                        },
                        bgcolor: theme.palette.background.default,
                      }}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <FormHelperText error id="standard-weight-helper-text-email-login">
                        {formik.errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <LoadingButton fullWidth size="large" type="submit" variant="contained">
                  Login
                </LoadingButton>
              </form>
            </ContentStyle>
          </Container>
      </RootStyle>
      <ToastContainer />
    </Page>
  );
}
