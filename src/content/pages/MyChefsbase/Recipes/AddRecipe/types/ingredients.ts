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
  category: string | null;
  rating: number | null;
}

export interface ingredients {
  numberOfIngredients: number | null;
  ingredients: ingredients_ingredients[] | null;
}

export interface ingredientsVariables {
  name?: string | null;
  offset?: number | null;
  limit?: number | null;
}
