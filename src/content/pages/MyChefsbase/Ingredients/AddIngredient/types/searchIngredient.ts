/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchIngredient
// ====================================================

export interface searchIngredient_searchIngredient {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface searchIngredient {
  searchIngredient: (searchIngredient_searchIngredient | null)[] | null;
}

export interface searchIngredientVariables {
  ingredientname?: string | null;
}
