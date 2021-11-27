/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL query operation: FilterProducts
// ====================================================

export interface FilterProducts_filterProducts_price_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface FilterProducts_filterProducts_price {
  __typename: "PricePerQuantity";
  price: number | null;
  quantity: FilterProducts_filterProducts_price_quantity | null;
}

export interface FilterProducts_filterProducts_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
  email: string;
}

export interface FilterProducts_filterProducts {
  __typename: "Product";
  id: string;
  name: string;
  rating: number | null;
  price: FilterProducts_filterProducts_price | null;
  brand: string | null;
  origin: string | null;
  suppliers: FilterProducts_filterProducts_suppliers[] | null;
}

export interface FilterProducts {
  numberOfProducts: number | null;
  filterProducts: FilterProducts_filterProducts[] | null;
}

export interface FilterProductsVariables {
  input?: ProductFilterInput | null;
  offset?: number | null;
  limit?: number | null;
}
