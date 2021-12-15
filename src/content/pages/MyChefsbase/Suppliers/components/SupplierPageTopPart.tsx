import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { LoadingScreen } from "src/components/layout";
import { IngredientFilterInput, ProductFilterInput, SupplierFilterInput } from "src/globalTypes";
import { SupplierFilter } from "../filtersuppliers";


export const TopPartSupplierPage = ({
    setInput,
}: {
  setInput: (values: SupplierFilterInput) => void;
}) => {

  return (
    <SupplierFilter
    onChange={(values) => setInput(values)}
    />
  )
}