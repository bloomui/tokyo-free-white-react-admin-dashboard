/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Menus
// ====================================================

export interface Menus_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface Menus_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Menus_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface Menus_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Menus_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface Menus {
  allSeasons: string[] | null;
  allThemes: string[] | null;
  suppliers: Menus_suppliers[] | null;
  products: Menus_products[] | null;
  ingredients: Menus_ingredients[] | null;
  recipes: Menus_recipes[] | null;
  dishes: Menus_dishes[] | null;
}

export interface MenusVariables {
  productname: string;
}
