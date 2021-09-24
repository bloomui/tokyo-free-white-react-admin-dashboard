/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ingredient
// ====================================================

export interface ingredient_ingredient_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface ingredient_ingredient {
  __typename: "Ingredient";
  id: string;
  name: string;
  rating: number | null;
  products: ingredient_ingredient_products[] | null;
}

export interface ingredient {
  ingredient: ingredient_ingredient | null;
}

export interface ingredientVariables {
  id: string;
}
