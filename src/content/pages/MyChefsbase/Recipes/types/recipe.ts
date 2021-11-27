/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: recipe
// ====================================================

export interface recipe_recipe_method {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface recipe_recipe {
  __typename: "Recipe";
  id: string;
  name: string;
  rating: number | null;
  type: string | null;
  method: recipe_recipe_method[] | null;
}

export interface recipe {
  recipe: recipe_recipe | null;
}

export interface recipeVariables {
  id: string;
}
