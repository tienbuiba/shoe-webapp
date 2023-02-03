import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { apiUserGetDeliveryAddress } from 'src/services/Address';
import account from 'src/_mock/account';
import TokenService from '../../services/TokenService';

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith',
//   timezone: 'GTM-7'
// };

const AccountProfile = (props) => {
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const [dataListAddress, setDataListAddress] = useState(null);

  useEffect(() => {
    apiUserGetDeliveryAddress().then((res) => {
      setDataListAddress(res?.data?.data[0]);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={profile.avatarUrl === 'default.png' ? account.photoURL : profile.avatarUrl}
            sx={{
              height: 64,
              mb: 2,
              width: 64
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {profile.username}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {`${dataListAddress?.city?.name} ${dataListAddress?.district?.name}`}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {dataListAddress?.detail}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;