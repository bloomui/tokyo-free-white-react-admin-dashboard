/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: product
// ====================================================

export interface product_product_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface product_product {
  __typename: "Product";
  id: string;
  name: string;
  rating: number | null;
  brand: string | null;
  origin: string | null;
  suppliers: product_product_suppliers[] | null;
}

export interface product {
  product: product_product | null;
}

export interface productVariables {
  id: string;
}
