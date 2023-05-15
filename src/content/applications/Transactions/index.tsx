import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';

import RecentOrders from './RecentOrders';

interface IRegister {
  sensorName?: String;
}

function ApplicationsTransactions(props: IRegister) {
  const { sensorName } = props;

  return (
    <>
      <Helmet>
        <title>{`Registros de ${sensorName}`}</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader sensorName={sensorName}/>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
