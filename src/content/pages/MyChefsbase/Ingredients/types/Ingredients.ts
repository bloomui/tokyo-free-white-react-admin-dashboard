/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Ingredients
// ====================================================

export interface Ingredients_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface Ingredients_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Ingredients_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Ingredients_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface Ingredients_menus {
  __typename: "NewMenu";
  id: string;
  name: string;
}

export interface Ingredients {
  allCategories: string[] | null;
  suppliers: Ingredients_suppliers[] | null;
  products: Ingredients_products[] | null;
  recipes: Ingredients_recipes[] | null;
  dishes: Ingredients_dishes[] | null;
  menus: Ingredients_menus[] | null;
}
