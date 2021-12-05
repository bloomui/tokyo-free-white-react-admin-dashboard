import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { IngredientFilterInput, ProductFilterInput, SupplierFilterInput } from "src/globalTypes";
import { SupplierFilter } from "../filtersuppliers";


export const TopPartSupplierPage = ({
    setOpenAddSupplier,
    setInput,
}: {
    setOpenAddSupplier: () => void;
  setInput: (values: SupplierFilterInput) => void;
}) => {
  const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
  const [name, setName] = useState()

  // const { loading, data, error } = useQuery(SuppliersData)
  // if (loading) return <LoadingScreen />;
  // if (error) return <LoadingScreen />;

  return (
    <SupplierFilter
    setOpenAddSupplier={setOpenAddSupplier}
    onClose={() => setOpenFilterInputDialog(false)}
    // products={data.products}
    // ingredients={data.ingredients}
    // menus={data.menus}
    // dishes={data.dishes}
    // recipes={data.recipes}
    onChange={(values) => setInput(values)}
    />
  )
}