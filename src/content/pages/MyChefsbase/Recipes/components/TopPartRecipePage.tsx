import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { RecipeFilterInput } from "src/globalTypes";
import { RecipeFilter } from "../filterrecipes";
import { RecipesData } from "../api";


export const TopPartRecipePage = ({
    setInput,
}: {
  setInput: (values: RecipeFilterInput) => void;
}) => {
  const { loading, data, error } = useQuery(RecipesData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <RecipeFilter
    types={data.allTypes}
    onChange={(values) => setInput(values)}
    />
  )
}