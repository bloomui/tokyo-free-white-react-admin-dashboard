/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllDishes
// ====================================================

export interface AllDishes_dishes {
  __typename: "Dish";
  id: string;
  name: string;
}

export interface AllDishes {
  dishes: AllDishes_dishes[] | null;
}
