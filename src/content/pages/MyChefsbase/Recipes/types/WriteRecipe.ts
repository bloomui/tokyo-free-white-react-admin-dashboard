/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddRecipeInput, RecipeIngredients, StepToMethodInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: WriteRecipe
// ====================================================

export interface WriteRecipe {
  writeRecipe: boolean | null;
}

export interface WriteRecipeVariables {
  boolean: number;
  input: AddRecipeInput;
  ingredients?: RecipeIngredients[] | null;
  method: StepToMethodInput[];
}
