import {
    Box,
    LinearProgress,
    Grid,
  } from "@material-ui/core";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { DishFilterInput } from "src/globalTypes";
import { useDishQuery } from "./api";
import { DishTable } from "./DishTable";
import { DishFilter, initialValues } from "./filterdishes";
  
  export const DishPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {
    const [ input, setInput] = useState<DishFilterInput>(initialValues);

    const { loading, data } = useDishQuery({
      input: input,
      });
  
    let content;
    if (loading && !data) content = <LoadingScreen />;
    else if (data) {
      content = (
        <>
        <Grid container spacing={2} xs={12}>
        <Grid key={0} item xs={12}>
        <DishFilter
        suppliers={data.suppliers}
        products={data.products}
        menus={data.menus}
        recipes={data.recipes}
        ingredients={data.ingredients}
        themes={data.allThemes}
        types={data.allTypes}
        onChange={(values) => setInput(values)}
        />
        </Grid>
        <Grid key={1} item xs={12}>
        <DishTable
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