import { Container, Grid } from '@mui/material';
import React from 'react';
import Page from 'src/components/Page';
import { ProfileDetails } from 'src/components/profile/ProfileDetails';
import Header from 'src/layouts/Header';
import TokenService from 'src/services/TokenService';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const profile = JSON.parse(TokenService.getLocalProfile('profile'));
  return (
    <Page>
      <Header />
      <Container maxWidth="lg" sx={{mt: '150px'}}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ProfileDetails profile={profile}></ProfileDetails>
          </Grid>
          <Grid item xs={12}>
            <ChangePassword/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Profile;