import { Grid, Container } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "src/components/pageHeader/PageHeader";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { user } from "../MyChefsbase";
import { useGetMenuQuery } from "../MyChefsbase/Menus/api";
import { FilterMenus_filterMenus } from "../MyChefsbase/Menus/types/FilterMenus";

export const Orders = ({menu}: {menu: FilterMenus_filterMenus}) =>  {

    
    return (
<>
      <Helmet>
        <title>Bestellingen</title>
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

          </Grid>
          </Grid>
          </Container>
          </>
    )
}