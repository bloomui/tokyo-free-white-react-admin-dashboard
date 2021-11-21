/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: products
// ====================================================

export interface products_products_price_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface products_products_price {
  __typename: "PricePerQuantity";
  price: number | null;
  quantity: products_products_price_quantity | null;
}

export interface products_products {
  __typename: "Product";
  id: string;
  name: string;
  brand: string | null;
  origin: string | null;
  rating: number | null;
  price: products_products_price | null;
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
