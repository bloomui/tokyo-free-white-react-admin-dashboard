/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listInventory
// ====================================================

export interface listInventory_listInventory_ingredient {
  __typename: "Ingredient";
  name: string;
  id: string;
}

export interface listInventory_listInventory_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface listInventory_listInventory {
  __typename: "IngredientFromInventory";
  ingredient: listInventory_listInventory_ingredient | null;
  quantity: listInventory_listInventory_quantity | null;
  brand: string | null;
  expiration: string | null;
  price: number | null;
}

export interface listInventory {
  listInventory: listInventory_listInventory | null;
}
