/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_suppliers {
  __typename: "Supplier";
  id: string;
  name: string;
}

export interface Products_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface Products_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface Products_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface Products_menus {
  __typename: "NewMenu";
  id: string;
  name: string;
}

export interface Products {
  allBrands: string[] | null;
  allOrigins: string[] | null;
  suppliers: Products_suppliers[] | null;
  ingredients: Products_ingredients[] | null;
  recipes: Products_recipes[] | null;
  dishes: Products_dishes[] | null;
  menus: Products_menus[] | null;
}
