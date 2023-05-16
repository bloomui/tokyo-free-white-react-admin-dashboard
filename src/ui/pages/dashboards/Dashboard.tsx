import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/ui/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/ui/components/Footer';

/* import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity'; */
import SensoresList from './SensoresList';

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>SmartReflect Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            {/* cards "mis sensores" */}
            <SensoresList />
          </Grid>

        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
