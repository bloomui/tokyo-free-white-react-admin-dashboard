/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchMenu
// ====================================================

export interface searchMenu_searchMenu {
  __typename: "NewMenu";
  id: string;
  name: string;
}

export interface searchMenu {
  searchMenu: (searchMenu_searchMenu | null)[] | null;
}

export interface searchMenuVariables {
  menuname?: string | null;
}
