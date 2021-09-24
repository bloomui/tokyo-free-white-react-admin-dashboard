/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Recipes
// ====================================================

export interface Recipes_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface Recipes_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface Recipes_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface Recipes_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface Recipes_menus {
  __typename: "NewMenu";
  id: string;
  name: string;
}

export interface Recipes {
  allTypes: string[] | null;
  suppliers: Recipes_suppliers[] | null;
  products: Recipes_products[] | null;
  ingredients: Recipes_ingredients[] | null;
  dishes: Recipes_dishes[] | null;
  menus: Recipes_menus[] | null;
}
