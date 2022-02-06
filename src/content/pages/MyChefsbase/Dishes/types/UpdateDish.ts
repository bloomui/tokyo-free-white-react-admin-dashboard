/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DishInput, QuantityToId, StepToMethodInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDish
// ====================================================

export interface UpdateDish {
  updateDish: boolean | null;
}

export interface UpdateDishVariables {
  input: DishInput;
  recipes?: QuantityToId[] | null;
  method: StepToMethodInput[];
}
