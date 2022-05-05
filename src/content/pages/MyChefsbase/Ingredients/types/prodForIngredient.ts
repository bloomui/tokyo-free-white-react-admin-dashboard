/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: prodForIngredient
// ====================================================

export interface prodForIngredient_ingredient_products {
  __typename: "Product";
  id: string;
  name: string;
}

export interface prodForIngredient_ingredient {
  __typename: "Ingredient";
  products: prodForIngredient_ingredient_products[] | null;
}

export interface prodForIngredient {
  ingredient: prodForIngredient_ingredient | null;
}

export interface prodForIngredientVariables {
  id: string;
}
