/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllIngredients
// ====================================================

export interface AllIngredients_ingredients {
  __typename: "Ingredient";
  id: string;
  name: string;
}

export interface AllIngredients {
  ingredients: AllIngredients_ingredients[] | null;
}
