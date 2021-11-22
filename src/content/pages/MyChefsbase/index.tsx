import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Tab, Tabs, Box, Container, Grid, Button, DialogTitle, Dialog, DialogContent, } from '@material-ui/core';
import Footer from 'src/components/Footer';
import React, { useState } from 'react';
import { MenuPage } from 'src/content/pages/MyChefsbase/Menus';
import { DishPage } from 'src/content/pages/MyChefsbase/Dishes';
import { RecipePage } from 'src/content/pages/MyChefsbase/Recipes';
import { PageHeader } from 'src/components/pageHeader/PageHeader';
import { IngredientPage } from './Ingredients';
import { SupplierPage } from './Suppliers';
import { ProductPage } from './Products';
import { clearAuth } from 'src/utilities/auth';
import { useNavigate } from 'react-router';

export enum ChefsTab {
  Menus = "Menus",
  Gerechten = "Gerechten",
  Recepten = "Recepten",
  Ingredienten = "Ingredienten",
  Producten = "Producten",
  Leveranciers = "Leveranciers",
  Favorieten = "Favorieten",
}

export const user =
{
  name: 'Soup Bros',
  avatar: '/static/images/avatars/SB_logo.png',
  title: "Let's check the Soup Bros Chefsbase!"
};

const serializeTab = (tab: string): ChefsTab | string => {
  if (tab === "Menus") {
    return ChefsTab.Menus;
  }
  if (tab === "Gerechten") {
    return ChefsTab.Gerechten;
  }
  if (tab === "Recepten") {
    return ChefsTab.Recepten;
  }
  if (tab === "Ingredienten") {
    return ChefsTab.Ingredienten;
  } 
  if (tab === "Producten") {
    return ChefsTab.Producten;
  }
  if (tab === "Leveranciers") {
    return ChefsTab.Leveranciers;
  } 
  if (tab === "Favorieten") {
    return ChefsTab.Favorieten;
  }
  else {
    return tab;
  }
};

const determineTab = (tab?: string): ChefsTab => {
  const enumValues: (string | ChefsTab)[] = Object.values(ChefsTab);

  if (tab && enumValues.includes(tab)) {
    return serializeTab(tab) as ChefsTab;
  } else {
    return ChefsTab.Menus;
  }
};

function MyChefsBase() {
  const [value, setValue] = useState(0);
  const [page, setPage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate()

  // const selectedTab = determineTab(tab);

  // console.log(selectedTab);
  // const setTab = (tab: ChefsTab) => history.push(routes.scheme({ id, tab }));
      
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
        <title>My Chefsbase</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
        title={user.title}
        name={user.name}
        avatar={user.avatar} />
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
          <Grid item lg={8} xs={12}>
          <Button onClick={() => setOpen(true)} variant="contained" color="primary">
              Upload een document
            </Button> 
            <Button onClick={() => {
              clearAuth();
              navigate(`/`)
            }

            }>Log Out</Button>         
            </Grid>
        </Grid>
      </Container>
      <UploadDocument open={open} onClose={() => setOpen(false)}/>
      <Footer />
    </>
  );
}

export default MyChefsBase;

export const UploadDocument = ({open, onClose}:{ open: boolean, onClose: () => void}) => {

  return (
<Dialog
        open={open}
        >
          <DialogTitle>Upload een document</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={6}>
              <Button fullWidth variant="contained" >Download Template</Button>
              </Grid>
              <Grid item xs={6}>
              <Button fullWidth variant="contained" >Upload document</Button>
              </Grid>
              <Grid item xs={6}>
              <Button fullWidth variant="outlined"  onClick={onClose}>Terug</Button>
              </Grid>
              <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={onClose}>Uploaden</Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
  )
}
