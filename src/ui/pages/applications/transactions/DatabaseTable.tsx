import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/ui/components/PageTitleWrapper';
import { Grid, Container, Button } from '@mui/material';
import Footer from 'src/ui/components/Footer';
import RecentOrders from './RecentOrders';
import PageHeader from './PageHeader';
import { useNavigate, useParams } from 'react-router-dom';

function DatabaseTable() {
  const { sensorName } = useParams();
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate(`/`)
  }


  return (
    <>
      <Helmet>
        <title>{`Registros de ${sensorName}`}</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Grid item xs={6}>
            <PageHeader sensorName={sensorName} />
          </Grid>
          <Grid item xs={4}>
            <Button variant='contained' onClick={handleBackButton}>
              Volver
            </Button>
          </Grid>
        </Grid>
      </Container>
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
    </>
  );
}

export default DatabaseTable;
