/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddMenuInput, AddCourseToDishesInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddMenu
// ====================================================

export interface AddMenu {
  addMenu: boolean | null;
}

export interface AddMenuVariables {
  input: AddMenuInput;
  courses?: AddCourseToDishesInput[] | null;
}
