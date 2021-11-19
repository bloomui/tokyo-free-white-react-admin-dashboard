/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: products
// ====================================================

export interface products_products {
  __typename: "Product";
  id: string;
  name: string;
  brand: string | null;
  origin: string | null;
  rating: number | null;
  price: number | null;
}

export interface products {
  numberOfProducts: number | null;
  products: products_products[] | null;
}

export interface productsVariables {
  name?: string | null;
  offset?: number | null;
  limit?: number | null;
}
