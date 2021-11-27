/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_getProducts_price_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface GetProducts_getProducts_price {
  __typename: "PricePerQuantity";
  price: number | null;
  quantity: GetProducts_getProducts_price_quantity | null;
}

export interface GetProducts_getProducts {
  __typename: "Product";
  id: string;
  name: string;
  price: GetProducts_getProducts_price | null;
}

export interface GetProducts {
  getProducts: (GetProducts_getProducts | null)[] | null;
}

export interface GetProductsVariables {
  ids?: string[] | null;
}
