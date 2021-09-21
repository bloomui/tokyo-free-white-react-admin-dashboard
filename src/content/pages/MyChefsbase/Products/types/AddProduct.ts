/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddProductInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddProduct
// ====================================================

export interface AddProduct {
  addProduct: boolean | null;
}

export interface AddProductVariables {
  input: AddProductInput;
  suppliers?: string[] | null;
}
