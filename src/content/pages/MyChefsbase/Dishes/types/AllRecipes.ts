/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllRecipes
// ====================================================

export interface AllRecipes_recipes {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface AllRecipes {
  recipes: AllRecipes_recipes[] | null;
}
