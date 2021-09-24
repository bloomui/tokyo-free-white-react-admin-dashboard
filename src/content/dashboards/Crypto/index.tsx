import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Tab, Tabs, Box, Container, Grid, } from '@material-ui/core';
import Footer from 'src/components/Footer';
import React, { useState } from 'react';
import { MenuPage } from 'src/content/pages/MyChefsbase/Menus';
import { DishPage } from 'src/content/pages/MyChefsbase/Dishes';
import { RecipePage } from 'src/content/pages/MyChefsbase/Recipes';
import { IngredientPage } from 'src/content/pages/MyChefsbase/Ingredients';
import { ProductPage } from 'src/content/pages/MyChefsbase/Products';
import { SupplierPage } from 'src/content/pages/MyChefsbase/Suppliers';

function MyChefsBase() {
  const [value, setValue] = useState(0);
  const [page, setPage] = useState<number>(0);
      
  let content;

  switch (value) {
    case 0:
      content = <MenuPage page={page} setPage={setPage}/>;
      break;

    case 1:
      content = <DishPage  page={page} setPage={setPage}/>;
      break;
    case 2:
      content = <RecipePage  page={page} setPage={setPage}/>;
      break;
    case 3:
      content = <IngredientPage  page={page} setPage={setPage}/>;
    break;
    case 4:
      content = <ProductPage  page={page} setPage={setPage}/>;
    break;
    case 5:
      content = <SupplierPage  page={page} setPage={setPage}/>;
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

export default MyChefsBase;

