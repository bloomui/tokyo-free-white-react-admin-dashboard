/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { IngredientInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateIngredient
// ====================================================

export interface UpdateIngredient {
  updateIngredient: boolean | null;
}

export interface UpdateIngredientVariables {
  input: IngredientInput;
  products?: string[] | null;
}
