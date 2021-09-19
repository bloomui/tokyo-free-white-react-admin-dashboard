import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { DishFilterInput } from "src/globalTypes";
import { DishFilter } from "../filterdishes";
import { DishesData } from "../api";


export const TopPartDishPage = ({
    setOpenAddDish,
    setInput,
}: {
  setOpenAddDish: () => void;
  setInput: (values: DishFilterInput) => void;
}) => {
  const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
  const [name, setName] = useState()

  const { loading, data, error } = useQuery(DishesData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <DishFilter
    setOpenAddDish={setOpenAddDish}
    onClose={() => setOpenFilterInputDialog(false)}
    suppliers={data.suppliers}
    products={data.products}
    menus={data.menus}
    recipes={data.recipes}
    ingredients={data.ingredients}
    themes={data.allThemes}
    types={data.allTypes}
    onChange={(values) => setInput(values)}
    />
  )
}