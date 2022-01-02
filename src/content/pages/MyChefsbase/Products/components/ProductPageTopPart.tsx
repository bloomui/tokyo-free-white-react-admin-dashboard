import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { IngredientFilterInput, ProductFilterInput } from "src/globalTypes";
import { ProductsData } from "../api";
import { ProductFilter, ProductFilterFormInput } from "../filterproducts";


export const TopPartProductPage = ({
    setInput,
}: {
  setInput: (values: ProductFilterFormInput) => void;
}) => {
  const { loading, data, error } = useQuery(ProductsData)
  if (loading) return <LoadingScreen />;
  if (error) return <LoadingScreen />;

  return (
    <ProductFilter
    origins={data.allOrigins}
    brands={data.allBrands}
    onChange={(values) => setInput(values)}
    />
  )
}