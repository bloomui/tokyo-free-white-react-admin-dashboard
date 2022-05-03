/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddRecipeInput, IngredientNames, IngredientIds, StepToMethodInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddRecept
// ====================================================

export interface AddRecept {
  addRecept: boolean | null;
}

export interface AddReceptVariables {
  input: AddRecipeInput;
  newIngredients?: IngredientNames[] | null;
  oldIngredients?: IngredientIds[] | null;
  method: StepToMethodInput[];
}
