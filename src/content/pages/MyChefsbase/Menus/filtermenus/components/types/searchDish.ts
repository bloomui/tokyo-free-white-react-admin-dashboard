/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchDish
// ====================================================

export interface searchDish_searchDish {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface searchDish {
  searchDish: (searchDish_searchDish | null)[] | null;
}

export interface searchDishVariables {
  dishname?: string | null;
}
