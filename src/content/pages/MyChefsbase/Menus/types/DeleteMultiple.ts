/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { KitchenType } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteMultiple
// ====================================================

export interface DeleteMultiple {
  deleteMultiple: string | null;
}

export interface DeleteMultipleVariables {
  ids: string[];
  kitchenType: KitchenType;
}
