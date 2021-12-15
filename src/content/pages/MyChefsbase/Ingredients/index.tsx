import {
    Box,
    LinearProgress,
    Grid,
  } from "@material-ui/core";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { DishFilterInput, IngredientFilterInput, RecipeFilterInput } from "src/globalTypes";
import { useFilterIngredientsQuery } from "./api";
import { TopPartIngredientPage } from "./components/IngredientPageTopPart";
import { IngredientTable } from "./components/IngredientTable";
import { initialIngredientValues } from "./filterIngredients";
import { AddIngredientDialog } from "./ingredientDialogs/AddIngredientDialog";
  
  export const IngredientPage = ({
    page,
    setPage,
  }: {
    page: number;
    setPage: (newPage: number) => void;
  }) => {
    const [ input, setInput] = useState<IngredientFilterInput>(initialIngredientValues);

    const { loading, data } = useFilterIngredientsQuery({
      page: page,
      input: input,
      });
  
    let content;
    if (loading && !data) content = <LoadingScreen />;
    else if (data) {
      content = (
        <>
        <IngredientTable
        data={data}
        page={page}
        setPage={setPage}
        />
        </>
      );
    }
  
    return (
      <>
      <TopPartIngredientPage
          setInput={(values) => setInput(values)}/>
        <Box height={3}>{loading && <LinearProgress />}</Box>
        {content}
      </>
    );
  };