import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Footer from 'src/components/Footer';

function Tooltips() {
  return (
    <>
      <Helmet>
        <title>Tooltips - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Tooltips"
          subHeading="Tooltips display informative text when users hover over, focus on, or tap an element."
          docs="https://material-ui.com/components/tooltips/"
        />
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
            <Card>
              <CardHeader title="Positioning" />
              <Divider />
              <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ width: 500 }}>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Tooltip arrow title="Add" placement="top-start">
                        <Button>top-start</Button>
                      </Tooltip>
                      <Tooltip arrow title="Add" placement="top">
                        <Button>top</Button>
                      </Tooltip>
                      <Tooltip arrow title="Add" placement="top-end">
                        <Button>top-end</Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Grid item xs={6}>
                      <Tooltip arrow title="Add" placement="left-start">
                        <Button>left-start</Button>
                      </Tooltip>
                      <br />
                      <Tooltip arrow title="Add" placement="left">
                        <Button>left</Button>
                      </Tooltip>
                      <br />
                      <Tooltip arrow title="Add" placement="left-end">
                        <Button>left-end</Button>
                      </Tooltip>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={6}
                      alignItems="flex-end"
                      direction="column"
                    >
                      <Grid item>
                        <Tooltip arrow title="Add" placement="right-start">
                          <Button>right-start</Button>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip arrow title="Add" placement="right">
                          <Button>right</Button>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Tooltip arrow title="Add" placement="right-end">
                          <Button>right-end</Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justifyContent="center">
                    <Grid item>
                      <Tooltip arrow title="Add" placement="bottom-start">
                        <Button>bottom-start</Button>
                      </Tooltip>
                      <Tooltip arrow title="Add" placement="bottom">
                        <Button>bottom</Button>
                      </Tooltip>
                      <Tooltip arrow title="Add" placement="bottom-end">
                        <Button>bottom-end</Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Tooltips;
