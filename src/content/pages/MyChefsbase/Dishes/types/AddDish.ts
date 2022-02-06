/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddDishInput, QuantityToId, StepToMethodInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddDish
// ====================================================

export interface AddDish {
  addDish: boolean | null;
}

export interface AddDishVariables {
  input: AddDishInput;
  recipes?: QuantityToId[] | null;
  method: StepToMethodInput[];
}
