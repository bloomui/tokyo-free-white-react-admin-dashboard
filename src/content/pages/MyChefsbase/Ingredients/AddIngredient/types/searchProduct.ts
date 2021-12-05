/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchProduct
// ====================================================

export interface searchProduct_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface searchProduct {
  products: searchProduct_products[] | null;
}

export interface searchProductVariables {
  productname?: string | null;
}
