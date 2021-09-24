/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RecipeInput, QuantityToId, StepToMethodInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateRecipe
// ====================================================

export interface UpdateRecipe {
  updateRecipe: boolean | null;
}

export interface UpdateRecipeVariables {
  input: RecipeInput;
  ingredients?: QuantityToId[] | null;
  method?: StepToMethodInput[] | null;
}
