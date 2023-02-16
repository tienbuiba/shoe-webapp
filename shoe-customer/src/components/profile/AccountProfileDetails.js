import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import TokenService from '../../services/TokenService';
import { useEffect } from 'react';
import { apiUserUpdateProfile } from 'src/services/User';
import { closeLoadingApi, openLoadingApi } from 'src/redux/creates-action/LoadingAction';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';


export const AccountProfileDetails = (props) => {
  const { images } = props;
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const dispatch = useDispatch();
  useEffect(() => {
    setUserName(profile.username);
    setPhone(profile.phone);
  }, [])


  const options = {
    autoClose: 2000,
    position: toast.POSITION.TOP_RIGHT,
  };

  const [userName, setUserName] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleUsernameChange = (e) => {
    setUserName(e.target.value)

  }

  const handlePhoneChange = (e) => {
    setPhone(e.target.value)
  }

  const handleUpdateInfor = (e) => {

    dispatch(openLoadingApi());
    if (phone !== null && userName !== null && images !== null) {
      apiUserUpdateProfile(phone, userName, images).then(res => {
        console.log(res);
        toast.success(res.data.data.message, options);
      }).catch(err => {
        console.log(err);
        toast.error(err.response.data.message, options);
      }).finally(() => {
        dispatch(closeLoadingApi());
      })
    } else {
      alert("nhap du truong")
    }
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                disabled
                required
                value={profile.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="User name"
                name="userName"
                onChange={handleUsernameChange}
                required
                value={userName}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handlePhoneChange}
                type="number"
                value={phone}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            style={{ width: '150px' }}
            className="red_button_auth"
            onClick={handleUpdateInfor}
          >
            Save details
          </Button>
        </Box>
      </Card>
      <ToastContainer></ToastContainer>
    </form>
  );
};
