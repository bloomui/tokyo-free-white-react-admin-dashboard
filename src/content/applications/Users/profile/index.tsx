
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';

import { Container, Grid } from '@material-ui/core';

import ProfileCover from './ProfileCover';
import RecentActivity from './RecentActivity';
import Feed from './Feed';
import PopularTags from './PopularTags';
import MyCards from './MyCards';
import Addresses from './Addresses';

function ManagementUserProfile() {

  const user = {
    savedCards: 7,
    name: 'Ricardo Hekers & Kariem El Kanaawi',
    coverImg: '/static/images/avatars/SB_logo.png',
    avatar: '/static/images/avatars/SB_logo.png',
    description: 'Soup To Go',
    jobtitle: 'Owner Soup Bros',
    location: 'Maastricht, The Netherlands',
  };

  return (
    <>
      <Helmet>
        <title>User Details - Management</title>
      </Helmet>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentActivity />
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <Feed />
          </Grid>
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ManagementUserProfile;
