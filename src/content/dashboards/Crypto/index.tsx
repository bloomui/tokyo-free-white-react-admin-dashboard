import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Tab, Tabs, Box, Container, Grid, LinearProgress, Typography } from '@material-ui/core';
import Footer from 'src/components/Footer';

import AccountBalance from './AccountBalance';
import Wallets from './Wallets';
import AccountSecurity from './AccountSecurity';
import WatchList from './WatchList';
import React, { useState } from 'react';
import { MenuTable } from 'src/content/pages/MyChefsbase/Menus/MenuTable';
import { useMenuQuery } from 'src/content/pages/MyChefsbase/Menus/api';
import { MenuFilterInput } from 'src/globalTypes';
import { MenuFilter } from 'src/content/pages/MyChefsbase/Menus/filtermenus';
import { MenuPage } from 'src/content/pages/MyChefsbase/Menus';
import { DishPage } from 'src/content/pages/MyChefsbase/Dishes';

function DashboardCrypto() {
  const [value, setValue] = useState(0);
  const [page, setPage] = useState<number>(0);

  const initialMenuValues: MenuFilterInput = {
    name: '',
    offset: 0,
    limit: 0,
    themes: [],
    seasons: [],
    periodstartdate: '',
    periodenddate: '',
    recipes: [],
    dishes: [],
    ingredients: [],
    products: [],
    rating: 0
  }
  const [ input, setInput] = useState<MenuFilterInput>(initialMenuValues);

    const { loading, data } = useMenuQuery({
      input: input,
      });
  
      
  let content;

  switch (value) {
    case 0:
      content = <MenuPage page={page} setPage={setPage}/>;
      break;

    case 1:
      content = <DishPage  page={page} setPage={setPage}/>;
      break;
    case 2:
      content = <Box>Recepten</Box>;
      break;
    case 3:
      content = <Box>Ingrediënten</Box>;
    break;
    case 3:
      content = <Box>Producten</Box>;
    break;
    case 3:
      content = <Box>Leveranciers</Box>;
    break;
    default:
        content = <Box>Favorieten</Box>;
        break;
  }
  return (
    <>
      <Helmet>
        <title>Crypto Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
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
          <Tabs
        value={value}
        onChange={(e, newValue) => setValue(newValue as number)}
      >
        <Tab
          label={`Menus`}
        />
        <Tab
          label={`Gerechten`}
        />
        <Tab
        label={`Recepten`}
      />
      <Tab
          label={`Ingrediënten`}
        />
        <Tab
          label={`Producten`}
        />
        <Tab
          label={`Leveranciers`}
        />
        <Tab
          label={`Favorieten`}
        />
      </Tabs>
      <Box height={3}>{loading && <LinearProgress />}</Box>
      {content}
          </Grid>
          {/* <Grid item lg={8} xs={12}>
            <Wallets />
          </Grid>
          <Grid item lg={4} xs={12}>
            <AccountSecurity />
          </Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;

