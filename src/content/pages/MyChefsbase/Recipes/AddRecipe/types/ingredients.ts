/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ingredients
// ====================================================

export interface ingredients_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
  rating: number | null;
}

export interface ingredients {
  ingredients: ingredients_ingredients[] | null;
}

export interface ingredientsVariables {
  name?: string | null;
}
