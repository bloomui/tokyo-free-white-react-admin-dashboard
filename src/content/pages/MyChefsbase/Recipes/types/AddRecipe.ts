/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddRecipeInput, QuantityToId, NewIngredientInput, StepToMethodInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddRecipe
// ====================================================

export interface AddRecipe {
  addRecipe: boolean | null;
}

export interface AddRecipeVariables {
  input: AddRecipeInput;
  ingredients?: QuantityToId[] | null;
  newIngredients?: NewIngredientInput[] | null;
  method: StepToMethodInput[];
}
