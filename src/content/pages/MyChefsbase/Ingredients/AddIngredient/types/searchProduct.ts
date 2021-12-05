/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchProduct
// ====================================================

export interface searchProduct_searchProduct {
  __typename: "Product";
  id: string;
  name: string;
}

export interface searchProduct {
  searchProduct: (searchProduct_searchProduct | null)[] | null;
}

export interface searchProductVariables {
  productname?: string | null;
}
