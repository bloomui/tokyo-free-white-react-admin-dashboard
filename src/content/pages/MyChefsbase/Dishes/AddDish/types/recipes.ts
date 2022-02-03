/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: recipes
// ====================================================

export interface recipes_recipes_quantity {
  __typename: "Quantity";
  unit: string;
}

export interface recipes_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
  type: string | null;
  rating: number | null;
  quantity: recipes_recipes_quantity | null;
}

export interface recipes {
  numberOfRecipes: number | null;
  recipes: recipes_recipes[] | null;
}

export interface recipesVariables {
  name?: string | null;
  offset?: number | null;
  limit?: number | null;
}
