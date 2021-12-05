import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { RecipeFilterInput } from "src/globalTypes";
import { RecipeFilter } from "../filterrecipes";
import { RecipesData } from "../api";


export const TopPartRecipePage = ({
    setOpenAddRecipe,
    setInput,
}: {
    setOpenAddRecipe: () => void;
  setInput: (values: RecipeFilterInput) => void;
}) => {
  const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
  const [name, setName] = useState()

  const { loading, data, error } = useQuery(RecipesData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <RecipeFilter
    setOpenAddRecipe={setOpenAddRecipe}
    onClose={() => setOpenFilterInputDialog(false)}
    // suppliers={data.suppliers}
    // products={data.products}
    // menus={data.menus}
    // dishes={data.dishes}
    // ingredients={data.ingredients}
    types={data.allTypes}
    onChange={(values) => setInput(values)}
    />
  )
}