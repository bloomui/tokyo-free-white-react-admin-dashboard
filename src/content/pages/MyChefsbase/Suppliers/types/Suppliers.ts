/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Suppliers
// ====================================================

export interface Suppliers_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Suppliers_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface Suppliers_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Suppliers_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface Suppliers_menus {
  __typename: "NewMenu";
  id: string;
  name: string;
}

export interface Suppliers {
  products: Suppliers_products[] | null;
  ingredients: Suppliers_ingredients[] | null;
  recipes: Suppliers_recipes[] | null;
  dishes: Suppliers_dishes[] | null;
  menus: Suppliers_menus[] | null;
}
