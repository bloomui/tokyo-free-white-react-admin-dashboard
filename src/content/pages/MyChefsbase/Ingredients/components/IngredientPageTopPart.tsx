import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { IngredientFilterInput } from "src/globalTypes";
import { IngredientsData } from "../api";
import { IngredientFilter } from "../filterIngredients";


export const TopPartIngredientPage = ({
    setOpenAddIngredient,
    setInput,
}: {
    setOpenAddIngredient: () => void;
  setInput: (values: IngredientFilterInput) => void;
}) => {
  const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
  const [name, setName] = useState()

  const { loading, data, error } = useQuery(IngredientsData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <IngredientFilter
    setOpenAddIngredient={setOpenAddIngredient}
    onClose={() => setOpenFilterInputDialog(false)}
    // suppliers={data.suppliers}
    // products={data.products}
    // menus={data.menus}
    // dishes={data.dishes}
    // recipes={data.recipes}
    allCategories={data.allCategories}
    onChange={(values) => setInput(values)}
    />
  )
}