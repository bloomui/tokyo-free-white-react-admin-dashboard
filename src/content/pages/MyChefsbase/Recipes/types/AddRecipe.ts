/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddRecipeInput, RecipeIngredientsForm, StepToMethodInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddRecipe
// ====================================================

export interface AddRecipe {
  addRecipe: boolean | null;
}

export interface AddRecipeVariables {
  input: AddRecipeInput;
  ingredients?: RecipeIngredientsForm[] | null;
  method: StepToMethodInput[];
}
