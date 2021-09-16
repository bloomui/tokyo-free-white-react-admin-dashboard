import {
    Box,
    LinearProgress,
    Grid,
  } from "@material-ui/core";
  import TablePagination from '@material-ui/core/TablePagination';
  import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { MenuFilterInput } from "src/globalTypes";
import { useMenuQuery } from "./api";
import { initialValues, MenuFilter } from "./filtermenus";
import { MenuTable } from "./MenuTable";
  
  export const MenuPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {
    const [ input, setInput] = useState<MenuFilterInput>(initialValues);

    const { loading, data } = useMenuQuery({
      input: input,
      });
  
    let content;
    if (loading && !data) content = <LoadingScreen />;
    else if (data) {
      content = (
        <>
        <Grid container spacing={2} xs={12}>
        <Grid key={0} item xs={12}>
        <MenuFilter
        suppliers={data.suppliers}
        products={data.products}
        dishes={data.dishes}
        recipes={data.recipes}
        ingredients={data.ingredients}
        themes={data.allThemes}
        seasons={data.allSeasons}
        onChange={(values) => setInput(values)}
        />
        </Grid>
        <Grid key={1} item xs={12}>
        <MenuTable
        data={data}
        page={page}
        setPage={setPage}
        />
        </Grid>
        </Grid>
        </>
      );
    }
  
    return (
      <>
          <Box height={3}>{loading && <LinearProgress />}</Box>
        {content}
      </>
    );
  };
