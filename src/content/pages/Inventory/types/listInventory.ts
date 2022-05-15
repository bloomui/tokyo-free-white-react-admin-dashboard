/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listInventory
// ====================================================

export interface listInventory_listInventory_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface listInventory_listInventory_products_quantity {
  __typename: "Quantity";
  quantity: number;
  unit: string;
}

export interface listInventory_listInventory_products {
  __typename: "InventoryProduct";
  price: number | null;
  id: string;
  name: string;
  quantity: listInventory_listInventory_products_quantity;
  exp: string | null;
}

export interface listInventory_listInventory {
  __typename: "InventoryOutput";
  ingrId: string;
  ingrName: string;
  quantity: listInventory_listInventory_quantity;
  products: listInventory_listInventory_products[] | null;
}

export interface listInventory {
  listInventory: (listInventory_listInventory | null)[] | null;
}
