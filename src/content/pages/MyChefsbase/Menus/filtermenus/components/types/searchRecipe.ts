/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchRecipe
// ====================================================

export interface searchRecipe_searchRecipe {
  __typename: "Recipe";
  id: string;
  name: string;
}

export interface searchRecipe {
  searchRecipe: (searchRecipe_searchRecipe | null)[] | null;
}

export interface searchRecipeVariables {
  recipename?: string | null;
}
