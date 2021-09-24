/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterProducts
// ====================================================

export interface FilterProducts_filterProducts_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface FilterProducts_filterProducts {
  __typename: "Product";
  id: string;
  name: string;
  rating: number | null;
  price: number | null;
  brand: string | null;
  origin: string | null;
  suppliers: FilterProducts_filterProducts_suppliers[] | null;
}

export interface FilterProducts {
  filterProducts: FilterProducts_filterProducts[] | null;
}

export interface FilterProductsVariables {
  input?: ProductFilterInput | null;
}
