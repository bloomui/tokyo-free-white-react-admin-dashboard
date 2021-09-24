/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Dishes
// ====================================================

export interface Dishes_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface Dishes_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Dishes_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface Dishes_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Dishes_menus {
  __typename: "NewMenu";
  id: string;
  name: string;
}

export interface Dishes {
  allThemes: string[] | null;
  allTypes: string[] | null;
  suppliers: Dishes_suppliers[] | null;
  products: Dishes_products[] | null;
  ingredients: Dishes_ingredients[] | null;
  recipes: Dishes_recipes[] | null;
  menus: Dishes_menus[] | null;
}
