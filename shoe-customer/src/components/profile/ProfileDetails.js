import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import TokenService from 'src/services/TokenService';
import Page from '../Page';

export const ProfileDetails = (props) => {
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  const { t } = useTranslation("translation");
  return (
    <Page title='Profile'>
      <form
        autoComplete="off"
        noValidate
        {...props}
      >
        <Card>
          <CardHeader
            subheader="Details information"
            title="Thông tin cá nhân"
          />
          <Divider />
          <CardContent sx={{ px: 5 }}>
            <Grid container spacing={3}>
              <Grid
                container
                item
              >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    Username
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <p>
                    {profile.username}
                  </p>
                </Grid>
              </Grid>
              <Grid
                container
                item
              >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    Email:
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <p >
                    {profile.email}
                  </p>
                </Grid>
              </Grid>
              <Grid
                container
                item            >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    Phone:
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <p >
                    {profile.phone}
                  </p>
                </Grid>
              </Grid>
              <Grid
                container
                item
              >
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Typography variant="body2">
                    Status
                  </Typography>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={6}
                >
                  <Button variant="contained" color={(profile.status === 'ACTIVE' && 'success') || 'error'} sx={{ cursor: 'default', color: '#fff' }}>
                    {(profile.status)}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      </form>
    </Page>
  );
};