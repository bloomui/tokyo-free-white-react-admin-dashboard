/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: methodForRecipe
// ====================================================

export interface methodForRecipe_methodForRecipe {
  __typename: "StepToMethod";
  step: number;
  method: string;
}

export interface methodForRecipe {
  methodForRecipe: methodForRecipe_methodForRecipe[] | null;
}

export interface methodForRecipeVariables {
  id: string;
}
