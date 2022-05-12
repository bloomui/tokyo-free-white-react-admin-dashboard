import { Box, Grid, Container, Card } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';

import { experimentalStyled } from '@material-ui/core/styles';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';
import { MyLogo } from './../../components/pageHeader/PageHeader'
import React from 'react';

const OverviewWrapper = experimentalStyled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

function Overview() {

  return (
    <OverviewWrapper>
      <Helmet>
        <title>My Chefsbase, the resource base for topchefs!</title>
      </Helmet>
      <Container maxWidth="lg">
        
        <Card sx={{ p: 10, mb: 10, borderRadius: 12 }}>
          <Hero />
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
