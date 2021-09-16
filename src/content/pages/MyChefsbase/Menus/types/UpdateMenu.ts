/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MenuInput, CourseToDishesInput } from "./../../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMenu
// ====================================================

export interface UpdateMenu {
  updateMenu: boolean | null;
}

export interface UpdateMenuVariables {
  input: MenuInput;
  courses?: CourseToDishesInput[] | null;
}
