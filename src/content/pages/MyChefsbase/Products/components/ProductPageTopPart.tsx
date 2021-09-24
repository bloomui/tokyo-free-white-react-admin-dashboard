import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { IngredientFilterInput, ProductFilterInput } from "src/globalTypes";
import { ProductsData } from "../api";
import { ProductFilter, ProductFilterFormInput } from "../filterproducts";


export const TopPartProductPage = ({
    setOpenAddProduct,
    setInput,
}: {
    setOpenAddProduct: () => void;
  setInput: (values: ProductFilterFormInput) => void;
}) => {
  const [ openFilterInputDialog, setOpenFilterInputDialog] = React.useState(false)
  const [name, setName] = useState()

  const { loading, data, error } = useQuery(ProductsData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <ProductFilter
    origins={data.allOrigins}
    brands={data.allBrands}
    setOpenAddProduct={setOpenAddProduct}
    onClose={() => setOpenFilterInputDialog(false)}
    suppliers={data.suppliers}
    ingredients={data.ingredients}
    menus={data.menus}
    dishes={data.dishes}
    recipes={data.recipes}
    onChange={(values) => setInput(values)}
    />
  )
}