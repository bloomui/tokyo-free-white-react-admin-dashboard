/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllProducts
// ====================================================

export interface AllProducts_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface AllProducts {
  products: AllProducts_products[] | null;
}
