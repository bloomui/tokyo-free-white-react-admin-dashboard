/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: dishes
// ====================================================

export interface dishes_dishes {
  __typename: "Dish";
  id: string;
  name: string;
  type: string | null;
  rating: number | null;
  theme: string | null;
}

export interface dishes {
  numberOfDishes: number | null;
  dishes: dishes_dishes[] | null;
}

export interface dishesVariables {
  name?: string | null;
  offset?: number | null;
  limit?: number | null;
}
